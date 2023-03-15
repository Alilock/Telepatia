import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './stack/AuthStack'
import HomeStack from './stack/HomeStack'
const Stack = createNativeStackNavigator()
const index = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='AuthStack' component={AuthStack} />
            <Stack.Screen name='Home' component={HomeStack} />
        </Stack.Navigator>
    )
}

export default index

const styles = StyleSheet.create({})