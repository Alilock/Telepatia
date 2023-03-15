import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SignUp from "../../models/Signup";
import axios from "axios";
import axiosInstance from "../../services/axios.instance";
export interface AuthState {
    user: any
    email: string,
    loading: 'reject' | 'pending' | 'fullfied' | null;
    token: string,
    error: any

};

const initialState: AuthState = {
    user: '',
    email: '',
    loading: null,
    token: '',
    error: '',

}
interface ConfirmEmail {
    confirmCode: number,
    email: string
}

export const registerThunk = createAsyncThunk("auth/register", async (payload: SignUp, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('api/auth/register', payload)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response.data.message)
    }
})
export const confirmEmail = createAsyncThunk('auth/confirm', async (payload: any, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('api/auth/confirmCode', payload);
        return res.data;

    } catch (error: any) {
        return rejectWithValue(error.response.data.message)

    }
})
export const loginThunk = createAsyncThunk('auth/login', async (payload: any, { rejectWithValue }) => {

    try {
        const res = await axiosInstance.post('api/auth/login', payload);
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message)

    }
})
const authSlice = createSlice({
    initialState,
    name: 'auht',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerThunk.pending, (state) => {
            state.loading = 'pending'
        })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = 'fullfied',
                    state.email = action.payload.email;
            }).addCase(registerThunk.rejected, (state, action) => {
                state.loading = 'reject',
                    state.error = action.payload
            })
            .addCase(confirmEmail.fulfilled, (state, action) => {
                state.loading = 'fullfied';
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(confirmEmail.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(confirmEmail.rejected, (state, action) => {
                state.loading = 'reject';
                state.error = action.payload
            }).addCase(loginThunk.pending, (state) => {
                state.loading = 'pending'
            }).addCase(loginThunk.rejected, (state, action) => {
                state.loading = 'reject';
                state.error = action.payload
            }).addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = 'fullfied',
                    state.email = action.payload.email
            })
    }
})

export default authSlice.reducer