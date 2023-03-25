import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import UserSlice from "./slice/UserSlice";
import PostSlice from "./slice/PostSlice";
import SearchSlice from "./slice/SearchSlice";
export const store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        userSlice: UserSlice,
        postSlice: PostSlice,
        searchSlice: SearchSlice,
    }
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch