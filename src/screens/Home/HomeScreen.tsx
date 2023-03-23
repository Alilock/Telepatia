import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType, AppDispatch } from '../../redux'
import { getAllFriendsPosts } from '../../redux/slice/PostSlice'
import Post from '../../components/Posts/Post'
const HomeScreen = () => {

    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: StoreType) => state.postSlice.loading)
    const friendsPosts = useSelector((state: StoreType) => state.postSlice.friendsPosts)
    useEffect(() => {
        dispatch(getAllFriendsPosts())

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={friendsPosts}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => <Post item={item} index={index} />}

            />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})