import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {CredentialResponse, GoogleLogin, CodeResponse} from '@react-oauth/google';
import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch, useSelector} from 'react-redux';
import {googleLogin} from './login-slice';
import {Button} from 'antd';
import GoogleButton from 'react-google-button';
import {useNavigate} from 'react-router-dom';
import {Row, Col} from 'antd';
import './style.css';
import {RootState} from '../index';

export default function Login() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/logs');
        }
    }, [isLoggedIn]);

    function handleGoogleLoginSuccess(res: CodeResponse) {
        dispatch(googleLogin(res, navigate));
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse: CodeResponse) => handleGoogleLoginSuccess(codeResponse),
        flow: 'auth-code',
        // scope: 'https://www.googleapis.com/auth/spreadsheets',
    });

    return (
        <div className="d-flex h-100 align-items-center justify-content-center">
            <div className="col-4" />
            <div className="d-flex flex-column col-4 align-items-center box">
                <div className="row mb-4">
                    <div className="d-flex flex-column col align-items-center">
                        <img src={'https://zerp.io/wp-content/uploads/2022/07/Untitled-design-24.png'} width={350} />
                    </div>
                </div>
                <div className="row">
                    <div className="col justify-content-center align-items-center">
                        <GoogleButton onClick={login} />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col px-5">
                        We take our customers privacy very seriously, <a href="https://zerp.io/data-protection/">click here</a> to
                        go through our privacy policy. Also, check out our <a href="https://zerp.io/tcs/">terms of services</a>
                    </div>
                </div>
            </div>
            <div className="col-4" />
        </div>
    );
}
