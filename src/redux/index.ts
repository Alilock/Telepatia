import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";

export const store = configureStore({
    reducer: {
        authSlice: AuthSlice
    }
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch