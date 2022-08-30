import {createSlice} from '@reduxjs/toolkit';

const Login = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess(state, action) {
            state.isLoggedIn = true;
        },
        logoutSuccess(state, action) {
            state.isLoggedIn = false;
        },
    },
});

export const {loginSuccess, logoutSuccess} = Login.actions;
export default Login.reducer;
