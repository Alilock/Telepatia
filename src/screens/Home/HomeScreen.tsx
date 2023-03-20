import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
    const userid = async () => {
        const useridd = await AsyncStorage.getItem('userId')
        // console.log(useridd);

    }
    userid()
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})