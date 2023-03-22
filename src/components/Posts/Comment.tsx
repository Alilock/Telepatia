import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Avatar from '../Avatar'
import SvgLike from '../Icons/Like';
import moment from 'moment';

const Comment = ({ item }: any) => {

    const timeSinceCreated = moment(item.createdAt).fromNow();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Avatar source={item.author && item.author.profilePicture} name={item.author && item.author.username} />
                <View>
                    <Text style={styles.name}>{item.author && item.author.username}</Text>
                    <Text style={styles.content}>{item.content && item.content}</Text>
                    <Text style={styles.time}>{timeSinceCreated}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <SvgLike stroke={'#fff'} width={16} height={16} />
            </TouchableOpacity>

        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row",
        gap: 8
    },
    name: {
        fontWeight: '700',
        color: "#ecebed"
    },
    content: {
        color: "#fff",
        marginVertical: 4
    },
    time: {
        color: "#727477",

    }
})