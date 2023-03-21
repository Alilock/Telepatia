import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from '../../components/Posts/Post'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType, AppDispatch } from '../../redux';
import { getPostById } from '../../redux/slice/PostSlice';
import { ActivityIndicator } from 'react-native-paper';
import Avatar from '../../components/Avatar';
import Comment from '../../components/Posts/Comment';
const CommentScreen = (props: any) => {
    const id = props.route.params
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: StoreType) => state.postSlice)

    useEffect(() => {
        dispatch(getPostById(id))
    }, [])
    console.log(state.post.likes);


    return (
        <View>
            {
                state.loadingpost == 'pending' ?
                    <ActivityIndicator />
                    :
                    state.post &&
                    <>
                        <Post item={state.post} />
                        <View>
                            <View style={styles.header}>
                                <Text style={styles.comments}>
                                    COMMENTS ({state.post && state.post.comments.length})
                                </Text>
                            </View>
                            <FlatList
                                data={state.post.comments}
                                renderItem={({ item, index }) => <Comment item={item} index={index} />}
                            />
                        </View>
                    </>
            }

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
    }
})