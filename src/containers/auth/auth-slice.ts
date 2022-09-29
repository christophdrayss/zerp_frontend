import {Action, createSlice} from '@reduxjs/toolkit';
import {RootStateType} from '../reducer';
import {AxiosResponse} from 'axios';

import network from '../../services/network';
import {Button, message, Space} from 'antd';
import {AppDispatch, RootState} from '../index';
import {ME} from '../../constants/network-calls';

export interface User {
    id: string;
    email: string;
    name: string;
    picture: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    authStatus: string;
    user: User | null;
}

const authInitialState: AuthState = {
    isLoggedIn: false,
    user: null,
    authStatus: 'idle',
};

const Auth = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logoutUser(state, action) {
            state.isLoggedIn = false;
            state.user = null;
        },
        setAuthStatus(state, action) {
            state.authStatus = action.payload;
        },
    },
});

export const onSessionLoginSuccess = (user: any) => (dispatch: any, getState: RootState) => {
    dispatch(loginSuccess(user));
    dispatch(setAuthStatus('succeeded'));
};

export const onLogin = (res: {jwt: string; user: any}) => (dispatch: any, getState: RootState) => {
    localStorage.setItem('jwt', res.jwt);
    dispatch(onSessionLoginSuccess(res.user));
};

export const logout = () => (dispatch: AppDispatch, getState: RootState) => {
    localStorage.removeItem('jwt');
    dispatch(logoutUser(null));
    dispatch(setAuthStatus('failed'));
};

export const getMyInfo = () => (dispatch: any, getState: RootState) => {
    network
        .fetch('POST', ME)
        .then((res: any) => {
            dispatch(onSessionLoginSuccess(res.data));
        })
        .catch((err) => {
            dispatch(logout());
        });
};

export const {loginSuccess, logoutUser, setAuthStatus} = Auth.actions;
export default Auth.reducer;
