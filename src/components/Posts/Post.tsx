import { StyleSheet, Text, View, Image, Share, TouchableOpacity } from 'react-native'
import React from 'react'
import SvgDotsVertical from '../Icons/DotsVertical'
import SvgShare from '../Icons/Share'
import SvgComment from '../Icons/Comment'
import SvgLike from '../Icons/Like'
import SvgBookmark from '../Icons/Bookmark'
import Avatar from '../Avatar'
import axiosInstance from '../../services/axios.instance'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType, AppDispatch } from '../../redux';
import { likePost } from '../../redux/slice/PostSlice'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../navigations'
import UserAuth from '../../features/hooks/UserAuth'
const Post = ({ item }: any) => {
    const [status, userId, loading] = UserAuth()

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    const goToComment = () => {
        navigation.navigate("Comment", item._id)
    }
    const goToUser = () => {
        if (userId != item.author._id) {
            navigation.navigate('ForeignProfile', item.author._id)
        }
    }
    const timeSinceCreated = moment(item.createdAt).fromNow();
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: StoreType) => state.postSlice)
    const user = useSelector((state: StoreType) => state.userSlice.user)

    const likeIt = () => {

        const payload = {
            userId: userId,
            postId: item._id
        }
        dispatch(likePost(payload))
    }


    return (
        <View style={styles.container}>
            <View style={styles.posthead}>
                <TouchableOpacity style={styles.author} onPress={goToUser} >
                    <LinearGradient colors={['#f62e8e', '#ac1af0']} style={styles.profile}>
                        {
                            item &&
                                item.author.profilePicture ?
                                <Avatar
                                    source={item.author.profilePicture}
                                /> :
                                <Text style={styles.profileimagetext}>
                                    {item.author.username[0] + item.author.username[1]}
                                </Text>
                        }

                    </LinearGradient>
                    <View>
                        <Text style={styles.authorname}>{item.author.username}</Text>
                        <Text style={styles.day}>{timeSinceCreated}</Text>
                    </View>

                </TouchableOpacity>
                <SvgDotsVertical stroke={"#727477"} />
            </View>
            <View style={styles.media}>
                {
                    item.content &&
                    <Text style={styles.content}>{item.content}</Text>
                }
                {

                    item.photos.length > 0 ?
                        <Image style={styles.image} source={{
                            uri: item.photos[0]

                        }} /> : null
                }
            </View>
            <View style={styles.actions}>
                <View style={styles.mainaction}>
                    <View style={styles.action}>
                        <TouchableOpacity onPress={likeIt}>
                            {
                                item && item.likes.includes(userId) ? <SvgLike stroke={"#2E8AF6"} />
                                    : <SvgLike stroke={"white"} />
                            }
                        </TouchableOpacity>
                        <Text style={styles.count}>{item && item.likes.length}</Text>
                    </View>
                    <View style={styles.action}>
                        <TouchableOpacity onPress={goToComment}>
                            <SvgComment stroke={"#ECEBED"} />

                        </TouchableOpacity>
                        <Text style={styles.count}>{item && item.comments.length}</Text>
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
    },

    profileimagetext: {
        color: "#fff"
    },
    profile: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: 'center'

    },
})