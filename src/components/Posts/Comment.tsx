import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Comment = ({ item }: any) => {
    return (
        <View>
            <Text>{item.content}</Text>
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({})