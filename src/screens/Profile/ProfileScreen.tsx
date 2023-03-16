import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/buttons/Button'
const ProfileScreen = () => {
    return (
        <View>
            <View style={styles.banner}>
                <Image style={styles.bannerimage} source={require('../../assets/images/banner.png')} />
                <LinearGradient colors={['#f62e8e', '#ac1af0']} style={styles.profile}>
                    <Image style={styles.profileimage} source={require('../../assets/images/profilephoto.jpg')} />
                </LinearGradient>
            </View>
            <View style={styles.aboutme}>
                <Text style={styles.username}>@Alilock</Text>
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
    }
})