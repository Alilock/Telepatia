import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
interface ButtonProps {
    title: string,
    color: string,
    onPress: any
}
const Button = ({ title, color, onPress}: ButtonProps) => {
    return (
        <TouchableOpacity style={[{ ...styles.div }, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    div: {
        width: "100%",
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    }
})