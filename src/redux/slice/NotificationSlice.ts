import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import axiosInstance from '../../services/axios.instance';
export interface Notification {
    _id: string;
    user: {
        _id: string;
        username: string;
        profilePicture: string;
    };
    userBy: {
        _id: string;
        username: string;
        profilePicture: string;
    };
    type: 'like' | 'comment';
    post: {
        _id: string;
        title: string;
    };
    date: string;
    isRead: boolean;
}

interface NotificationsState {
    notifications: any;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NotificationsState = {
    notifications: [],
    loading: 'idle',
    error: null,
};

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<{ data: Notification[] }>(`/api/notifications/${userId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }

    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put<{ data: Notification }>(`/api/notifications/${notificationId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error)
        }

    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
                state.loading = 'succeeded';
                state.notifications = groupNotificationsByDate(action.payload);

            })
            .addCase(fetchNotifications.rejected, (state, action: any) => {
                state.loading = 'failed';
                state.error = action.payload;
            })
            .addCase(markAsRead.fulfilled, (state, action: PayloadAction<Notification>) => {
                const notificationIndex = state.notifications.findIndex(
                    (notification: any) => notification._id === action.payload._id
                );
                if (notificationIndex !== -1) {
                    state.notifications[notificationIndex] = action.payload;
                }
            });
    },
});

const groupNotificationsByDate = (notifications: any) => {
    const grouped = notifications.reduce((acc: any, notification: any) => {
        const date = new Date(notification.date);
        const dateString = date.toDateString();
        if (!acc[dateString]) {
            acc[dateString] = [];
        }
        acc[dateString].push(notification);
        return acc;
    }, {});
    return Object.entries(grouped).map(([title, data]) => ({
        title,
        data,
    }));
};
export default notificationSlice.reducer;

export const selectNotifications = (state: RootState) => state.notificationSlcie.notifications;
export const selectNotificationsStatus = (state: RootState) => state.notificationSlcie.loading;
export const selectNotificationsError = (state: RootState) => state.notificationSlcie.error;