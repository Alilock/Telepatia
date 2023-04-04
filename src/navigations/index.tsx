import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './stack/AuthStack'
import AppStack from './stack/AppStack'
import UserAuth from '../features/hooks/UserAuth'
import { ActivityIndicator } from 'react-native-paper'
import CommentScreen from '../screens/Comment/CommentScreen'
import ForeignProfileScreen from '../screens/Profile/ForeignProfileScreen'
import ChatScreen from '../screens/Chat/ChatScreen'
import MessagesScreen from '../screens/Chat/MessagesScreen'
import AiChatScreen from '../screens/Chat/AiChatScreen'


export type RootStackParams = {
    Comment: any;
    AuthStack: any;
    AppStack: any;
    ForeignProfile: any;
    ChatScreen: any;
    MessagesScreen: any;
    AiChatScreen: any
};
const Stack = createNativeStackNavigator<RootStackParams>()
const index = () => {


    const [status, userId, loading] = UserAuth()


    return (

        loading ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }
            } >
                <ActivityIndicator />
            </View > :
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {

                    !status ? <>
                        <Stack.Screen name='AuthStack' component={AuthStack} />
                        <Stack.Screen name='AppStack' component={AppStack} />
                        <Stack.Screen name='Comment' component={CommentScreen} options={{
                            headerShown: true,
                            headerTintColor: "#ECEBED",
                            headerStyle: { backgroundColor: "#1c1c1c" },
                        }} />
                        <Stack.Screen name='ForeignProfile' component={ForeignProfileScreen} />
                        <Stack.Screen name='MessagesScreen' component={MessagesScreen} />

                    </>
                        :
                        <>
                            <Stack.Screen name='AppStack' component={AppStack} />
                            <Stack.Screen name='Comment' component={CommentScreen} options={{
                                headerShown: true,
                                headerTintColor: "#ECEBED",
                                headerStyle: { backgroundColor: "#1c1c1c" },
                            }} />
                            <Stack.Screen name='ForeignProfile' component={ForeignProfileScreen} />
                            <Stack.Screen name='ChatScreen' component={ChatScreen} />
                            <Stack.Screen name='MessagesScreen' component={MessagesScreen} />
                            <Stack.Screen name='AiChatScreen' component={AiChatScreen} />
                        </>

                }
            </Stack.Navigator>


    )
}

export default index

const styles = StyleSheet.create({})