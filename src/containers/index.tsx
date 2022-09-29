import {Provider} from 'react-redux';
import React from 'react';
import Navigator from './navigator/Navigator';
import {getStore} from '../services/redux';
import 'antd/dist/antd.css';
import ParentLayout from './parent-layout/ParentLayout';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from '../constants/config';
import Auth from './auth/Auth';
const store = getStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type ThunkFunctionType = (AppDispatch: AppDispatch, RootState: RootState) => void;

export default function App() {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider
                clientId={GOOGLE_CLIENT_ID}
                children={
                    <>
                        <React.StrictMode>
                            <Auth>
                                <BrowserRouter>
                                    <ParentLayout />
                                </BrowserRouter>
                            </Auth>
                        </React.StrictMode>
                    </>
                }
            />
        </Provider>
    );
}
