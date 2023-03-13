import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface SocialButtonProps {
    source: ImageSourcePropType;
}

const SocialButton = ({ source }: SocialButtonProps) => {
    return (
        <View style={styles.div}>
            <Image source={source} />

        </View>
    )
}

export default SocialButton

const styles = StyleSheet.create({
    div: {
        width: 48,
        height: 48,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        borderRadius: 24

    }
})