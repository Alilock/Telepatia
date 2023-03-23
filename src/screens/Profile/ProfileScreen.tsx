import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserAuth from '../../features/hooks/UserAuth';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType, AppDispatch } from '../../redux';
import { getAllFriendsPosts, postGetAllUser } from '../../redux/slice/PostSlice';
import { getUserById, updatePicThunk } from '../../redux/slice/UserSlice';
import SvgEditSvgrepoCom from '../../components/Icons/EditSvgrepoCom';
import ImagePickerModal from '../../components/ImagePickerModal';
import Post from '../../components/Posts/Post';
const Tab = createMaterialTopTabNavigator();
const ProfileScreen = () => {
    const [status, userId, loading] = UserAuth()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: StoreType) => state.postSlice)
    const user = useSelector((state: StoreType) => state.userSlice.user)
    const loadinguser = useSelector((state: StoreType) => state.userSlice.loading)
    const handleRefresh = () => {
        dispatch(getUserById(userId))
        dispatch(getAllFriendsPosts())
    }

    useEffect(() => {
        if (userId) {
            dispatch(getUserById(userId))
            dispatch(getAllFriendsPosts())
        }

    }, [userId])
    console.log(user);


    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const pickImage = () => {
        setIsModalVisible(true);
    };
    const handleImageSelect = (image: any) => {
        updatePic(image);
        setIsModalVisible(false);
    };
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    const updatePic = (image: any) => {

        const form = new FormData();
        if (image) {
            form.append("profilePic", {
                name: image.fileName, // Whatever your filename is
                uri: image.uri, //  file:///data/user/0/com.cookingrn/cache/rn_image_picker_lib_temp_5f6898ee-a8d4-48c9-b265-142efb11ec3f.jpg
                type: image.type, // video/mp4 for videos..or image/png etc...
            });
        }

        form.append("userId", userId)

        dispatch(updatePicThunk(form))
    }
    return (
        loadinguser == 'pending' ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
        </View> :
            <View>

                {
                    state.friendsPosts && <FlatList
                        onRefresh={handleRefresh}
                        refreshing={false}
                        data={state.friendsPosts.filter((e: any) => e.author._id === userId)}
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
                                                        uri: `http://localhost:8080/uploads/${user.profilePicture}`
                                                    }}
                                                /> : <Text style={styles.profileimagetext}>{user.username && user.username[0] + user.username[1]}</Text>
                                        }
                                        {/* <TouchableOpacity style={styles.edit} onPress={pickimage}>
                                    <SvgEditSvgrepoCom stroke={'#fff'} />
                                </TouchableOpacity> */}
                                        <TouchableOpacity style={styles.edit} onPress={pickImage}>
                                            <SvgEditSvgrepoCom stroke={'#fff'} />
                                        </TouchableOpacity>
                                        <ImagePickerModal visible={isModalVisible} onSelect={handleImageSelect} onClose={handleModalClose} />
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
                        )}

                    />
                }
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