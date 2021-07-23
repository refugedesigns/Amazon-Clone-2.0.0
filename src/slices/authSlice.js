import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        login(state) {},
        logout(state) {}
    }
})

export const authActions = authSlice.actions

export default authSlice