import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import axios from 'axios';
import { IMessage } from 'react-native-gifted-chat';
import { AppThunk } from '..';

interface ChatState {
    messages: IMessage[];
    loading: boolean;
}



const initialState: ChatState = {
    messages: [],
    loading: false,
};

const socket = io('https://telepatiaapi.onrender.com');

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<IMessage[]>) {
            state.messages = action.payload;
        },
        addMessage(state, action: PayloadAction<IMessage>) {
            const message = action.payload;
            console.log("message", message);

            const createdAt = message.createdAt
            const formattedMessage: IMessage = {
                ...message,
                createdAt
            };
            state.messages.push(formattedMessage);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const { setMessages, addMessage, setLoading } = chatSlice.actions;

export const getChatMessages = (senderId: string, receiverId: string): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    try {

        const response = await axios.get(`https://telepatiaapi.onrender.com/api/chat/${senderId}/${receiverId}`);
        const chat = response.data;
        console.log(chat);

        const formattedMessages: IMessage[] = chat.messages.map((message: any) => ({
            _id: message._id,
            text: message.content,
            createdAt: message.createdAt,
            user: {
                _id: message.sender._id,
                name: message.sender.username,
            },
        }));
        dispatch(setMessages(formattedMessages.reverse()));
    } catch (error) {
        console.log('error', error);
    } finally {
        dispatch(setLoading(false));
    }
};


export default chatSlice.reducer;