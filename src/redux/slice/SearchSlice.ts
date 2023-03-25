import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios.instance";


export const searchUsers = createAsyncThunk(
    'search/searchUsers',
    async (searchQuery: any) => {
        const response = await axiosInstance.get(`/api/users/search?q=${searchQuery}`);
        return response.data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.error.message;
            });
    },
});

export default searchSlice.reducer;
