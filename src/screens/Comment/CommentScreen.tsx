import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from '../../components/Posts/Post'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType, AppDispatch } from '../../redux';
import { getPostById, postComment } from '../../redux/slice/PostSlice';
import { ActivityIndicator } from 'react-native-paper';
import Avatar from '../../components/Avatar';
import Comment from '../../components/Posts/Comment';
import { Send } from '../../components/Icons';
const CommentScreen = (props: any) => {
    const id = props.route.params
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: StoreType) => state.postSlice)
    const userId = useSelector((state: StoreType) => state.userSlice.user._id)
    const [content, setContent] = useState('')
    useEffect(() => {
        dispatch(getPostById(id))
    }, [])

    const commentPost = () => {
        const payload = {
            userId: userId,
            postId: state.post._id,
            content: content
        }

        dispatch(postComment(payload))
    }

    return (
        state.loadingpost == 'pending' ?
            <ActivityIndicator />
            :
            state.post &&
            <View style={{ flex: 1, justifyContent: "space-between" }}>

                <View style={{ flex: 0.95, }}>
                    <Post item={state.post} />
                    <View style={styles.header}>
                        <Text style={styles.comments}>
                            COMMENTS ({state.post && state.post.comments.length})
                        </Text>
                    </View>
                    <FlatList
                        data={state.post.comments}
                        contentContainerStyle={{ rowGap: 20, marginTop: 32, paddingBottom: 35 }}
                        renderItem={({ item, index }) => <Comment item={item} index={index} />}
                    />

                </View>
                <View style={styles.inputwrap}>
                    <TextInput style={styles.input}
                        placeholder='Type your comment here'
                        onChangeText={setContent}
                        placeholderTextColor={"#ECEBED"}
                    />
                    <TouchableOpacity onPress={commentPost}>
                        <Send />
                    </TouchableOpacity>
                </View>

            </View>

    )
}

export default CommentScreen

const styles = StyleSheet.create({
    comments: {
        fontSize: 12,
        color: "#ECEBED",
        letterSpacing: 2
    },
    header: {
        marginHorizontal: 24,
        marginTop: 24
    },
    inputwrap: {
        bottom: 24,
        marginHorizontal: 24,
        flexDirection: "row",
        backgroundColor: "#323436",
        borderRadius: 32,
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        color: "#ECEBED"
    }
})