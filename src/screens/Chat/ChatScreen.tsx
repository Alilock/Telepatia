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
import { addMessage } from '../../redux/slice/ChatSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigations';
import SvgBack from '../../components/Icons/Back';
import SvgDotsVertical from '../../components/Icons/DotsVertical';

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

// const socket = io('http://localhost:8080');

const ChatScreen = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const receiverId = route.params.receiverId
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: StoreType) => state.userSlice.foreignUser);
    const [status, userId, loading] = UserAuth();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const socket = io('https://telepatiaapi.onrender.com');

    useEffect(() => {
        if (userId && receiverId) {
            dispatch(getForeignUser(receiverId));

            socket.on('connect', () => {
                socket.emit('join', userId);
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
                dispatch(addMessage(message))

                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, [message])

                );
            });


            setIsLoading(true);

            axios
                .get(`https://telepatiaapi.onrender.com/api/chat/${userId}/${receiverId}`)
                // .get(`http://localhost:8080/api/chat/${userId}/${receiverId}`)
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
    const gotoProfile = () => {
        navigation.navigate("ForeignProfile", receiverId)
    }
    const gotoBack = () => {
        navigation.goBack()

    }
    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#007aff', // set background color to light blue for messages sent by the current user
                    },
                    left: {
                        backgroundColor: '#323436', // set background color to light gray for messages sent by other users
                    },
                }}
                textStyle={{
                    left: {
                        color: "#ECEBED"
                    }
                }}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#999999" />
                </View>
            ) : (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backbtn} onPress={gotoBack}>
                            <SvgBack stroke={"#fff"} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footer} onPress={gotoProfile}>
                            <Avatar.Image size={40} source={{ uri: user.profilePicture }} />
                            <Text style={styles.username}>{user.username}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backbtn} >
                            <SvgDotsVertical stroke={"#fff"} />
                        </TouchableOpacity>
                    </View>
                    <GiftedChat
                        messages={messages}
                        onSend={handleSend}
                        user={{ _id: userId }}
                        renderAvatar={renderAvatar}
                        renderBubble={renderBubble}
                        textInputProps={{
                            style: {
                                alignItems: "center",
                                backgroundColor: '#323436',
                                borderRadius: 20,
                                paddingVertical: 10,
                                paddingHorizontal: 16,
                                width: "100%",
                                height: 40
                            },

                            placeholderStyle: {
                                fontSize: 29,
                            },
                            placeholder: 'Type a message...',
                            placeholderTextColor: '#ECEBED',
                            returnKeyType: 'send',
                        }}



                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 24,
    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
    },
    username: {
        marginLeft: 10, fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        color: "#ECEBED"

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backbtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#323436",
    },
});

export default ChatScreen;