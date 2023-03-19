import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Avatar = ({ source, width = 32, height = 32, raduis = 16 }: any) => {
    return (
        <View>
            <Image source={source} style={{ width: width, height: height, borderRadius: raduis }} />
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({})