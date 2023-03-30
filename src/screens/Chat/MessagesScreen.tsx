import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType, AppDispatch } from '../../redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserAuth from '../../features/hooks/UserAuth'
import { getAllChats } from '../../redux/slice/ChatSlice'
import { FlatList } from 'react-native-gesture-handler'
import LastMessage from '../../components/Message/LastMessage'
import { ActivityIndicator } from 'react-native-paper'
const MessagesScreen = () => {
    const [status, userId, loading] = UserAuth()
    const [chats, setChats] = useState<any>('')
    const dispatch = useDispatch<AppDispatch>()
    const chatState = useSelector((state: StoreType) => state.chatSlice)

    useEffect(() => {

        if (userId) {
            dispatch(getAllChats(userId))
            console.log(chatState.chats);

            setChats(chatState.chats.map((chat: any) => {
                const user = chat.users.filter((user: any) => user._id != userId)
                const messages = chat.messages
                return { ...chat, user: user, messages: messages }
            })
            )
        }
    }, [userId, dispatch])

    return (
        <SafeAreaView>
            {
                chatState.loadingChat ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator />
                </View>) :

                    chats && <FlatList
                        data={chats}
                        renderItem={({ item, index }) => (
                            <LastMessage item={item} />
                        )}
                    />
            }

        </SafeAreaView>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({})