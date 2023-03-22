import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'

const randomhex = () => {
    // Generate a random number between 0 and 16777215 (FFFFFF in hexadecimal)
    const randomNum = Math.floor(Math.random() * 16777215);
    // Convert the number to a hexadecimal string
    const hexCode = randomNum.toString(16);
    // Pad the string with leading zeros if necessary to make it 6 characters long
    return '#' + ('000000' + hexCode).slice(-6);
}
const Avatar = ({ source, width = 32, height = 32, raduis = 16, name }: any) => {


    return (

        <View>
            {
                source ? <Image
                    source={{
                        uri: `http://localhost:8080/uploads/${source}`
                    }}
                    style={{ width: width, height: height, borderRadius: raduis }} /> :
                    <View style={styles.avatar}>

                        <Text style={styles.profileimagetext}>{name && name[0].toUpperCase() + name[1].toUpperCase()}</Text>

                    </View>
            }

        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    profileimagetext: {
        color: "#fff",

    },
    avatar: {
        width: 32,
        height: 32,
        backgroundColor: randomhex(),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    }
})