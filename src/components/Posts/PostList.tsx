import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { datas } from '../../data/posts'
import Post from './Post'
const PostList = () => {
    return (
        <View>
            <FlatList data={datas}
                renderItem={Post}
                contentContainerStyle={{  }}
            />
        </View>
    )
}

export default PostList

const styles = StyleSheet.create({})