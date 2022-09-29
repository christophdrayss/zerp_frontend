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
        scope: 'https://www.googleapis.com/auth/spreadsheets',
    });

    return (
        <div>
            <Row style={{height: '100vh'}} align={'middle'} justify={'center'}>
                <Col>
                    <div className="login-box">
                        <Row align={'middle'} justify={'center'}>
                            <Col>
                                <img
                                    className="img-style"
                                    src={'https://zerp.io/wp-content/uploads/2022/07/Untitled-design-24.png'}
                                    width={230}
                                    height={70}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <GoogleButton onClick={login} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
