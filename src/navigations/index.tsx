import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './stack/AuthStack'
import AppStack from './stack/AppStack'
import UserAuth from '../features/hooks/UserAuth'
import { ActivityIndicator } from 'react-native-paper'
const Stack = createNativeStackNavigator()
const index = () => {
    const [status, loading] = UserAuth()

    return (

        loading ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }
            } >
                <ActivityIndicator />
            </View > :
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {

                    !status ? <>
                        <Stack.Screen name='AuthStack' component={AuthStack} />
                        <Stack.Screen name='AppStack' component={AppStack} />
                    </>
                        :
                        <Stack.Screen name='AppStack' component={AppStack} />
                }
            </Stack.Navigator>


    )
}

export default index

const styles = StyleSheet.create({})