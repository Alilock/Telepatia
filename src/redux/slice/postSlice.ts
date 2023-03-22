import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../services/axios.instance";
export interface PostState {
    posts: any,
    post: any
    userId: any,
    error: any,
    loading: 'reject' | 'pending' | 'fullfied' | null;
    loadingpost: 'reject' | 'pending' | 'fullfied' | null;
    loadingcomment: 'reject' | 'pending' | 'fullfied' | null;
}

const initialState: PostState = {
    posts: [],
    userId: '',
    post: '',
    error: '',
    loadingpost: null,
    loading: null,
    loadingcomment: null
}

export const postPostThunk = createAsyncThunk("post/post", async (payload: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('api/posts', payload)
        return response.data.data

    } catch (error: any) {
        return rejectWithValue(error.response.data.message)

    }
})

export const postGetAllUser = createAsyncThunk('post/getAllByUser', async (payload: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`api/posts/getAllByUser?userId=${payload}`)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getPostById = createAsyncThunk('post/getPostById', async (id: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`api/posts/getById?postId=${id}`)
        return response.data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const likePost = createAsyncThunk('post/likePost', async (payload: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('api/posts/likePost', payload)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response.data.message)
    }
})

export const postComment = createAsyncThunk('post/postComment', async (payload: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('api/posts/postComment', payload)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response.data.message)
    }
})

const postSlice = createSlice({
    initialState,
    name: 'Posts',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postPostThunk.pending, (state) => {
            state.loading = 'pending'
        }).addCase(postPostThunk.rejected, (state, action) => {
            state.loading = 'reject'
            state.error = action.payload
        }).addCase(postPostThunk.fulfilled, (state, action) => {
            state.loading = 'fullfied'

            state.posts.unshift(action.payload)
        })

        builder.addCase(postGetAllUser.pending, (state) => {
            state.loading = 'pending'

        }).addCase(postGetAllUser.rejected, (state, action) => {
            state.loading = 'reject'
            state.error = action.payload

        }).addCase(postGetAllUser.fulfilled, (state, action) => {
            state.loading = 'fullfied'
            state.posts = action.payload
        })

        builder.addCase(likePost.pending, (state) => {
            state.loading = 'pending'
        }).addCase(likePost.rejected, (state, action) => {
            state.loading = 'reject',
                state.error = action.payload
        })
            .addCase(likePost.fulfilled, (state, action) => {
                state.loading = 'fullfied';
                const likedPost = action.payload.data;
                const likedPostIndex = state.posts.findIndex((post: any) => post._id === likedPost._id);
                if (likedPostIndex >= 0) {
                    state.posts[likedPostIndex].likes = likedPost.likes;
                }
                if (state.post._id == action.payload.data._id) {
                    state.post.likes = action.payload.data.likes
                }
            })
        builder.addCase(getPostById.pending, (state, action) => {
            state.loadingpost = 'pending'

        }).addCase(getPostById.rejected, (state, action) => {
            state.loadingpost = 'reject',
                state.error = action.payload
        }).addCase(getPostById.fulfilled, (state, action) => {
            state.post = action.payload
            state.loadingpost = 'fullfied'
        })

        builder.addCase(postComment.pending, (state) => {
            state.loadingcomment = 'pending'
        }).addCase(postComment.rejected, (state, action) => {
            state.loadingcomment = 'reject',
                state.error = action.payload
        }).addCase(postComment.fulfilled, (state, action) => {

            state.loadingcomment = 'fullfied'
            console.log('ful', action.payload);
            state.post = action.payload
        })

    }

})

export default postSlice.reducer