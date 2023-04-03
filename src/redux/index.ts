import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import UserSlice from "./slice/UserSlice";
import PostSlice from "./slice/PostSlice";
import SearchSlice from "./slice/SearchSlice";
import ChatSlice from "./slice/ChatSlice";
import NotificationSlice from "./slice/NotificationSlice";
export const store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        userSlice: UserSlice,
        postSlice: PostSlice,
        searchSlice: SearchSlice,
        chatSlice: ChatSlice,
        notificationSlcie: NotificationSlice
    }
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;