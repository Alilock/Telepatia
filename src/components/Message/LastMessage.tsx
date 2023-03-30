import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Avatar from '../Avatar'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../navigations'

const LastMessage = ({ item }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const goToProfile = () => {
        navigation.navigate('ForeignProfile', item._id)
    }
    return (
        <TouchableOpacity style={styles.content} onPress={goToProfile}>
            <View style={styles.container}>
                <Avatar width={40} height={40} raduis={20} source={item.user[0].profilePicture} />
                <View>
                    <Text style={styles.username}>{item.user[0].username}</Text>
                    <Text style={styles.bio}>{item.messages[0].content}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default LastMessage

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 1,
        borderBottomColor: "#323436",
    },
    container: {
        flexDirection: "row",
        gap: 8,
        marginHorizontal: 24,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#323436"
    },
    username: {
        color: "#ECEBED",
        fontSize: 18,
        fontWeight: "700",
    },
    bio: {
        color: "#727477",
        fontSize: 14,
        fontWeight: "700",
    }
})