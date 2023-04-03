import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType, AppDispatch } from '../../redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserAuth from '../../features/hooks/UserAuth'
import { getAllChats } from '../../redux/slice/ChatSlice'
import { FlatList } from 'react-native-gesture-handler'
import LastMessage from '../../components/Message/LastMessage'
import { ActivityIndicator } from 'react-native-paper'
import SvgBack from '../../components/Icons/Back'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../navigations'

const MessagesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [status, userId, loading] = UserAuth()
    const [chats, setChats] = useState<any>([])
    const dispatch = useDispatch<AppDispatch>()
    const chatState = useSelector((state: StoreType) => state.chatSlice)

    useEffect(() => {
        if (userId) {
            dispatch(getAllChats(userId))
        }
    }, [dispatch, userId])

    useEffect(() => {
        const filterChat = () => {
            const chats = chatState.chats.map((chat: any) => {
                const user = chat.users.filter((user: any) => user._id != userId)
                const messages = chat.messages
                return { ...chat, user: user, messages: messages }
            })
            setChats(chats)
        }
        if (chatState.chats) {
            filterChat()

        }
    }, [chatState.chats, userId])
    const gotoBack = () => {
        navigation.goBack()
    }
    const renderHeader: React.FC = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.backbtn} onPress={gotoBack}>
                    <SvgBack stroke={"#fff"} />
                </TouchableOpacity>
                <Text style={styles.headText}>MESSAGES</Text>
            </View>
        )
    }
    return (
        <SafeAreaView>
            {chatState.loadingChat ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <FlatList
                    data={chats}
                    ListHeaderComponent={renderHeader}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({ item, index }) => (
                        <LastMessage item={item} />
                    )}
                />
            )}
        </SafeAreaView>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 24,
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center",
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
    headText: {
        color: "#ecebed",
        letterSpacing: 1,
        fontWeight: "700",
        position: "absolute",
        left: "35%"
    }
}) 