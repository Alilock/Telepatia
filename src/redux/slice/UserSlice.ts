import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';

interface UserState {
    userInfo: any,
}
const initialState: UserState = {
    userInfo: {}
}

const userSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {
        getUserInfo(state) {
            AsyncStorage.getItem('userInfo').then((data: any) => {
                const user = JSON.parse(data)
                if (user) {
                    return produce(state, draftState => {
                        draftState.userInfo = user;
                    });
                }
                return state;
            }).catch(error => {
                console.log('getUserInfo error:', error);
                return state;
            });
        }
    }
})

export const { getUserInfo } = userSlice.actions
export default userSlice.reducer;
