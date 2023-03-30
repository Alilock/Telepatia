import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Bubble, GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import UserAuth from '../../features/hooks/UserAuth';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreType } from '../../redux';
import { Avatar, Text } from 'react-native-paper';
import { getForeignUser } from '../../redux/slice/UserSlice';

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
// const socket = io('https://telepatiaapi.onrender.com');

const ChatScreen = ({ route }: any) => {
    const receiverId = route.params.receiverId
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: StoreType) => state.userSlice.foreignUser);
    const [status, userId, loading] = UserAuth();
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if (userId && receiverId) {
            dispatch(getForeignUser(receiverId));

            socket.on('connect', () => {
                console.log('Connected to server');
            });
            socket.emit('join', userId);

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
                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, [message])
                );
            });


            setIsLoading(true);

            axios
                // .get(`https://telepatiaapi.onrender.com/api/chat/${userId}/${receiverId}`)
                .get(`http://localhost:8080/api/chat/${userId}/${receiverId}`)
                .then(response => {
                    const chat = response.data;
                    if (chat) {
                        const formattedMessages: IMessage[] = chat.messages.map((message: any) => ({
                            _id: message._id,
                            text: message.content,
                            createdAt: message.createdAt,
                            user: {
                                _id: message.sender._id,
                                name: message.sender.username,
                                avatar: message.sender.profilePicture,
                            },
                        }));
                        setMessages(formattedMessages.reverse());

                    }


                    setIsLoading(false);
                })
                .catch(error => {
                    console.log('error', error);
                })


            return () => {
                socket.emit('leave', userId);
                socket.disconnect();
            };
        }
    }, [userId, receiverId]);

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

    const renderAvatar = (props: any) => {
        const { user } = props.currentMessage;
        return <Avatar.Image size={40} source={{ uri: user.avatar }} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#999999" />
                </View>
            ) : (
                <>
                    <TouchableOpacity style={styles.footer}>
                        <Avatar.Image size={40} source={{ uri: user.profilePicture }} />
                        <Text style={styles.username}>{user.username}</Text>
                    </TouchableOpacity>
                    <GiftedChat
                        messages={messages}
                        onSend={handleSend}
                        user={{ _id: userId }}
                        renderAvatar={renderAvatar}
                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    username: {
        marginLeft: 10, fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatScreen;