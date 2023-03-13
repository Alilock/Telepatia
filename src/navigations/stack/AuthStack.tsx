import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signup from '../../screens/Auth/Signup';
import Onboarding from '../../screens/Auth/Onboarding';
import BackButton from '../../components/buttons/BackButton';
import Confirm from '../../screens/Auth/Confirm';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Onboarding' component={Onboarding} />
            <Stack.Screen name='SignUp' component={Signup} />
            <Stack.Screen name='Confirm' component={Confirm} />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})