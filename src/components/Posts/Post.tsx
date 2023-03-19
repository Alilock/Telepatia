import { StyleSheet, Text, View, Image, Share } from 'react-native'
import React from 'react'
import SvgDotsVertical from '../Icons/DotsVertical'
import SvgShare from '../Icons/Share'
import SvgComment from '../Icons/Comment'
import SvgLike from '../Icons/Like'
import SvgBookmark from '../Icons/Bookmark'
import Avatar from '../Avatar'
const Post = ({ item }: any) => {

    return (
        <View style={styles.container}>
            <View style={styles.posthead}>
                <View style={styles.author}>
                    <Avatar source={{
                        uri: item.image
                    }} />
                    <View>
                        <Text style={styles.authorname}>{item.author_username}</Text>
                        <Text style={styles.day}>3d ago</Text>
                    </View>

                </View>
                <SvgDotsVertical stroke={'red'} />
            </View>
            <View style={styles.media}>
                {
                    item.content &&
                    <Text style={styles.content}>{item.content}</Text>
                }
                {

                    item.image &&
                    <Image style={styles.image} source={{
                        uri: item.image
                    }} />
                }
            </View>
            <View style={styles.actions}>
                <View style={styles.mainaction}>
                    <View style={styles.action}>
                        <SvgLike />
                        <Text style={styles.count}>{item.like_count}</Text>
                    </View>
                    <View style={styles.action}>

                        <SvgComment />
                        <Text style={styles.count}>{item.comment_count}</Text>
                    </View>
                    <View>
                        <SvgShare />
                    </View>
                </View>
                <View>
                    <SvgBookmark />
                </View>
            </View>
        </View >
    )
}

export default Post

const styles = StyleSheet.create({

    container: {
        paddingBottom: 16,
        paddingHorizontal: 24,
        marginTop: 24,
        borderBottomWidth: 2,
        borderBottomColor: "#323436"
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: "cover",
        borderRadius: 16,
    },
    posthead: {
        flexDirection: "row", justifyContent: "space-between"
    },
    author: {
        flexDirection: "row",
        gap: 8
    },

    authorname: {
        color: "#ECEBED",
        fontWeight: "700"
    },
    day: {
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 16,
        color: "#727477"
    },
    media: {
        marginVertical: 16,
        gap: 4
    },
    content: {
        color: "#ECEBED",
        lineHeight: 24,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    mainaction: {
        flexDirection: 'row',
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginRight: 20

    },
    count: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff"
    }
})