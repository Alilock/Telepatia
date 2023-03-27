import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import UserAuth from '../../features/hooks/UserAuth';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ChatScreenProps {
    route: {
        params: {
            userId: string;
            receiverId: string;
        };
    };
}

interface ChatMessage {
    _id: string;
    text: string;
    createdAt: Date;
    user: User;
}

const socket = io('http://localhost:8080');

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
    const [status, userId, loading] = UserAuth()
    const [receiverId, setReceiverId] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setReceiverId(route.params.receiverId);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('message', (chat: any) => {
            const newMessage = chat.messages[chat.messages.length - 1];
            const message: IMessage = {
                _id: newMessage._id,
                text: newMessage.content,
                createdAt: newMessage.createdAt,
                user: {
                    _id: newMessage.sender._id,
                    name: newMessage.sender.username,
                },
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, [message]));
        });

        socket.emit('join', userId);

        axios.get(`http://localhost:8080/api/chat/6411780de8b30ccf9df2aa7b/641c22c06b56837f6392fe4a`)
            .then(response => {
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

                setMessages(formattedMessages.reverse());
            })
            .catch(error => {
                console.log("error", error);
            });
        return () => {
            socket.emit('leave', route.params.userId);
            socket.disconnect();
        };
    }, []);

    const handleSend = (newMessages: IMessage[]) => {
        const message = newMessages[0];
        const newMessage: IMessage = {
            _id: Math.random().toString(36).substring(7),
            text: message.text,
            createdAt: new Date(),
            user: {
                _id: userId,
                name: 'Me',
            },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
        socket.emit('message', { senderId: userId, receiverId, content: message.text });
    };

    return (
        <SafeAreaView style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{ _id: userId }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChatScreen;