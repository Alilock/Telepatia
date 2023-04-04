import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType, AppDispatch } from '../../redux'
import { getAllFriendsPosts } from '../../redux/slice/PostSlice'
import Post from '../../components/Posts/Post'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SvgMessage from '../../components/Icons/Message'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../navigations'
import UserAuth from '../../features/hooks/UserAuth'
import { getUserById } from '../../redux/slice/UserSlice'



const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    const [status, userId, loadings] = UserAuth()

    const gotoMessages = () => {
        navigation.navigate("MessagesScreen",)
    }


    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: StoreType) => state.postSlice.loading)
    const friendsPosts = useSelector((state: StoreType) => state.postSlice.friendsPosts)
    const user = useSelector((state: StoreType) => state.userSlice)
    console.log(user);

    useEffect(() => {
        if (userId) {
            dispatch(getAllFriendsPosts())
            dispatch(getUserById(userId))
        }

    }, [userId])
    const handleRefresh = () => {
        dispatch(getAllFriendsPosts())

    }
    const headerComp = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Hello {user && user.user.username} !</Text>
            <TouchableOpacity onPress={gotoMessages} >
                <SvgMessage />
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading == 'pending' ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator />
                </View> :
                    <FlatList
                        ListHeaderComponent={headerComp}
                        onRefresh={handleRefresh}
                        refreshing={false}
                        data={friendsPosts}
                        stickyHeaderIndices={[0]}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => <Post item={item} index={index} />}

                    />
            }

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "#1c1c1c",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff"
    }
})