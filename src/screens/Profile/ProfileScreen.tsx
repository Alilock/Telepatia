import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/buttons/Button'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostList from '../../components/Posts/PostList';
import StoryList from '../../components/Stories/StoryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAuth from '../../features/hooks/UserAuth';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType, AppDispatch } from '../../redux';
import { postGetAllUser } from '../../redux/slice/PostSlice';
import { EditSvgrepoCom } from '../../components/Icons';
const Tab = createMaterialTopTabNavigator();
const ProfileScreen = () => {
    const [status, user, loading] = UserAuth()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: StoreType) => state.postSlice)
    useEffect(() => {
        if (user) {
            dispatch(postGetAllUser(user._id))
        }
    }, [user])

    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.6 }}>
                <View style={styles.banner}>
                    <Image style={styles.bannerimage} source={require('../../assets/images/banner.png')} />
                    <LinearGradient colors={['#f62e8e', '#ac1af0']} style={styles.profile}>
                        {
                            user && user.profilPicture ?
                                <Image style={styles.profileimage}
                                    source={{
                                        uri: `http://localhost:8080/uploads/${user.image}`
                                    }}
                                /> : user && <Text style={styles.profileimagetext}>{user.username[0] + user.username[1]}</Text>
                        }
                        <TouchableOpacity style={styles.edit}>
                            <EditSvgrepoCom stroke={'#fff'} />

                        </TouchableOpacity>
                    </LinearGradient>

                </View>
                <View style={styles.aboutme}>
                    <Text style={styles.username}>@{user && user.username}</Text>
                    <Text style={styles.located}>Baku 🇦🇿</Text>
                    <Text style={styles.bio}>Mobile Developer for Fun! 📲 </Text>
                </View>
                <View style={styles.statistics}>
                    <View style={styles.followings}>
                        <Text style={styles.count}>2,467</Text>
                        <Text style={styles.follow}>Followers</Text>
                    </View>
                    <View style={styles.followings}>
                        <Text style={styles.count}>2,467</Text>
                        <Text style={styles.follow}>Followers</Text>

                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.edittext}>Edit Profile</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ flex: 0.5 }}>
                {/* <Tab.Navigator screenOptions={{
                    tabBarActiveTintColor: "white",
                    tabBarIndicatorStyle: { backgroundColor: "#2E8AF6", height: 4 },
                }}>
                    <Tab.Screen name='Posts' component={PostList} />
                    <Tab.Screen name='Stories' component={StoryList} />
                </Tab.Navigator> */}
                {
                    state.posts && <PostList posts={state.posts} />
                }
            </View>
        </View >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
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
        borderColor: '#727477',
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