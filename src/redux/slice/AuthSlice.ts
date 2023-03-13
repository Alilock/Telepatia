import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SignUp from "../../models/Signup";
import axios from "axios";
import axiosInstance from "../../services/axios.instance";
export interface AuthState {
    user: any
    email: string,
    loading: 'reject' | 'pending' | 'fullfied' | null;
    token: string | null,
    error: string | undefined

};

const initialState: AuthState = {
    user: '',
    email: '',
    loading: null,
    token: null,
    error: '',

}
interface ConfirmEmail {
    confirmCode: number,
    email: string
}

export const registerThunk = createAsyncThunk("auth/register", async (payload: SignUp) => {
    const response = await axiosInstance.post('api/auth/register', payload)
    return response.data
})
export const confirmEmail = createAsyncThunk('auth/confirm', async (payload: any) => {
    const res = await axiosInstance.post('api/auth/confirmCode', payload);
    return res.data;
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
                    console.log(action.payload.email);
                state.email = action.payload.email;
            }).addCase(registerThunk.rejected, (state, action) => {
                state.loading = 'reject',
                    console.log("mess", action.error);
                state.error = action.error.message
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
                console.log("confim email rejected");
                state.loading = 'reject';
                state.error = action.error.message;
            });
    }
})

export default authSlice.reducer