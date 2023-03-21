import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { datas } from '../../data/posts'
import Post from './Post'
const PostList = ({ posts }: any) => {

    return (
        <FlatList data={posts}
            scrollsToTop
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => <Post item={item} index={index} />}
        />
    )
}

export default PostList

const styles = StyleSheet.create({})