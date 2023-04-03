import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'react-native-gifted-chat';
import axiosInstance from '../../services/axios.instance';

interface ChatState {
    messages: IMessage[];
    chats: any
    loading: boolean;
    loadingChat: boolean;
}



const initialState: ChatState = {
    messages: [],
    chats: [],
    loading: false,
    loadingChat: true
};

// const socket = io('https://telepatiaapi.onrender.com');

export const getAllChats = createAsyncThunk('getAll/chat', async (payload: any) => {
    try {
        const response = await axiosInstance.get(`api/chat/getall/${payload}`)
        return response.data
    } catch (error) {

    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<IMessage[]>) {
            state.messages = action.payload;
        },
        addMessage(state, action: PayloadAction<IMessage>) {
            const message = action.payload;

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
    extraReducers(builder) {
        builder.addCase(getAllChats.pending, (state, action) => {
            state.loadingChat = true
        })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.loadingChat = false,
                    state.chats = action.payload
            })
    },
});

export const { setMessages, addMessage, setLoading } = chatSlice.actions;

// export const getChatMessages = (senderId: string, receiverId: string): AppThunk => async dispatch => {
//     dispatch(setLoading(true));
//     try {

//         const response = await axios.get(`https://telepatiaapi.onrender.com/api/chat/${senderId}/${receiverId}`);
//         const chat = response.data;

//         const formattedMessages: IMessage[] = chat.messages.map((message: any) => ({
//             _id: message._id,
//             text: message.content,
//             createdAt: message.createdAt,
//             user: {
//                 _id: message.sender._id,
//                 name: message.sender.username,
//             },
//         }));
//         dispatch(setMessages(formattedMessages.reverse()));
//     } catch (error) {
//         console.log('error', error);
//     } finally {
//         dispatch(setLoading(false));
//     }
// };


export default chatSlice.reducer;