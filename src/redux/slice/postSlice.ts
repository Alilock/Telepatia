import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../services/axios.instance";
export interface PostState {
    posts: any,
    userId: any,
    error: any,
    loading: 'reject' | 'pending' | 'fullfied' | null;
}

const initialState: PostState = {
    posts: [],
    userId: '',
    error: '',
    loading: null
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

const postSlice = createSlice({
    initialState,
    name: 'Posts',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postPostThunk.pending, (state) => {
            state.loading = 'pending'
        })
            .addCase(postPostThunk.rejected, (state, action) => {
                state.loading = 'reject'
                state.error = action.payload
            }).addCase(postPostThunk.fulfilled, (state, action) => {
                state.loading = 'fullfied'
                console.log('return', action.payload);

                state.posts.push(action.payload)
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
    }

})

export default postSlice.reducer