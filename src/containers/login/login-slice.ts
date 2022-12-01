import {createSlice} from '@reduxjs/toolkit';
import {CodeResponse, CredentialResponse} from '@react-oauth/google';
import {AppDispatch, RootState} from '../index';
import network from '../../services/network';
import {message} from 'antd';
import {NavigateFunction} from 'react-router-dom';
import {AUTH_GOOGLE} from '../../constants/network-calls';
import {loginSuccess, onLogin} from '../auth/auth-slice';
import {API_BASE_URL} from '../../constants/config';
const Login = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {},
});

export const googleLogin = (credentials: CodeResponse, navigate: NavigateFunction) => (dispatch: any, getState: RootState) => {
    console.log('BASE_URL');
    console.log(API_BASE_URL);
    network
        .fetch('POST', AUTH_GOOGLE, credentials)
        .then((res: any) => {
            dispatch(onLogin(res.data));
        })
        .catch(async (e) => {
            await message.error(e.message);
        });
};

export const {} = Login.actions;
export default Login.reducer;
