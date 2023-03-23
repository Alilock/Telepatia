import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
import axiosInstance from "../../services/axios.instance";
import { err } from "react-native-svg/lib/typescript/xml";

interface UserState {
    user: any,
    error: any,
    loading: 'reject' | 'pending' | 'fullfied' | null;

}
const initialState: UserState = {
    user: {},
    error: '',
    loading: null

}
export const updatePicThunk = createAsyncThunk("update/users", async (payload: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put('api/users/putProfilePhoto', payload)

        return response.data
    } catch (error: any) {
        rejectWithValue(error)
    }
})

export const getUserById = createAsyncThunk('get/users', async (payload: any, { rejectWithValue }) => {
    try {

        const response = await axiosInstance.get(`api/users/getUserById/${payload}`)
        return response.data
    } catch (error: any) {

        return rejectWithValue(error.response.data.message)
    }
})
const userSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getUserById.pending, (state) => {
            state.loading = 'pending'
        })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = 'reject',
                    state.error = action.payload
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.user = action.payload,
                    state.loading = 'fullfied'
            })

        builder.addCase(updatePicThunk.pending, (state) => {
            state.loading = 'pending'
        })
            .addCase(updatePicThunk.rejected, (state, action) => {
                state.loading = 'reject',
                    state.error = action.payload
            })
            .addCase(updatePicThunk.fulfilled, (state, action) => {
                state.loading = 'fullfied'
                console.log(action.payload.user);
                state.user.profilePicture = action.payload.user.profilePicture
                state.user._ud = action.payload.user._id
            })
    }
})

export default userSlice.reducer;
