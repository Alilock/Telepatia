import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserAuth from '../../features/hooks/UserAuth';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType, AppDispatch } from '../../redux';
import { postGetAllUser } from '../../redux/slice/PostSlice';
import { getUserById, getForeignUser, updatePicThunk, followUser } from '../../redux/slice/UserSlice';
import SvgEditSvgrepoCom from '../../components/Icons/EditSvgrepoCom';
import ImagePickerModal from '../../components/ImagePickerModal';
import Post from '../../components/Posts/Post';
import SvgBack from '../../components/Icons/Back';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigations';
const ForeignProfileScreen = (props: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const id = props.route.params

    const [status, userId, loading] = UserAuth()

    const dispatch = useDispatch<AppDispatch>()
    const postSlice = useSelector((state: StoreType) => state.postSlice)
    const user = useSelector((state: StoreType) => state.userSlice.foreignUser)
    const loadinguser = useSelector((state: StoreType) => state.userSlice.loading)

    const handleRefresh = () => {
        dispatch(getForeignUser(id))
        dispatch(postGetAllUser(id))
    }

    const followHim = () => {
        const payload = {
            userId: userId,
            foreignId: user._id
        }
        dispatch(followUser(payload))
    }

    useEffect(() => {
        if (id) {
            dispatch(getForeignUser(id))
            dispatch(postGetAllUser(id))
        }
    }, [userId])

    const goBack = () => {
        navigation.goBack()
    }

    return (
        loadinguser == 'pending' ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
        </View> :
            <View>

                {
                    user.posts && <FlatList
                        onRefresh={handleRefresh}
                        refreshing={false}
                        data={postSlice.posts}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => <Post item={item} index={index} />}
                        ListHeaderComponent={() => (
                            <View style={{ flex: 0.6 }}>

                                <View style={styles.banner}>
                                    <Image style={styles.bannerimage} source={require('../../assets/images/banner.png')} />

                                    <LinearGradient colors={['#f62e8e', '#ac1af0']} style={styles.profile}>
                                        {
                                            user && user.profilePicture ?
                                                <Image style={styles.profileimage}
                                                    source={{
                                                        uri: user.profilePicture
                                                    }}
                                                /> : <Text style={styles.profileimagetext}>{user.username && user.username[0] + user.username[1]}</Text>
                                        }

                                    </LinearGradient>

                                </View>
                                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                                    <SvgBack stroke={"white"} width={35} />
                                </TouchableOpacity>
                                <View style={styles.aboutme}>
                                    <Text style={styles.username}>@{user && user.username}</Text>
                                    <Text style={styles.located}>Baku 🇦🇿</Text>
                                    <Text style={styles.bio}>Mobile Developer for Fun! 📲 </Text>
                                </View>
                                <View style={styles.statistics}>
                                    <View style={styles.followings}>
                                        <Text style={styles.count}>{user && user.followers.length}</Text>
                                        <Text style={styles.follow}>Followers</Text>
                                    </View>
                                    <View style={styles.followings}>
                                        <Text style={styles.count}>{user && user.following.length}</Text>
                                        <Text style={styles.follow}>Following</Text>

                                    </View>
                                    <TouchableOpacity style={styles.editButton} onPress={followHim}>
                                        <Text style={styles.edittext}>Follow</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}

                    />
                }
            </View >
    )
}

export default ForeignProfileScreen

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        zIndex: 9,
        top: 60,
        left: 24,
        width: 32,
        height: 32,
        backgroundColor: "#000",
        alignItems: "center",
        borderRadius: 16,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#323436"
    },
    banner: {
        height: 160,
        alignItems: "center"
    },
    bannerimage: {
        resizeMode: 'cover',
        width: "100%"
    },
    profile: {
        width: 150,
        height: 150,
        borderRadius: 75,
        top: '-50%',
        justifyContent: "center",
        alignItems: 'center'

    },
    profileimage: {
        width: '95%',
        height: '95%',
        borderRadius: 100,
    },
    profileimagetext: {
        fontSize: 64,
        color: "#fff"
    },
    aboutme: {
        marginTop: 91,
    },
    username: {
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 32,
        color: "white",
        textAlign: "center",
    },
    located: {
        fontSize: 14,
        lineHeight: 16,
        marginTop: 2,
        color: "#727477",
        textAlign: "center",
    },
    bio: {
        color: "white",
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8
    },
    statistics: {
        marginTop: 24,
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    followings: {
        rowGap: 4,

    },
    count: {
        color: 'white',
        fontWeight: "700",
        lineHeight: 18,
    },
    follow: {
        color: '#727477',
        fontWeight: '500'
    },
    editButton: {
        paddingHorizontal: 32,
        paddingVertical: 6,
        borderRadius: 30,
        backgroundColor: "#F62E8E",
        borderColor: '#F62E8E',
        borderWidth: 1
    },
    edittext: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 24
    },
    edit: {
        position: "absolute",
        zIndex: 1,
        right: 25,
        bottom: 10
    }
})