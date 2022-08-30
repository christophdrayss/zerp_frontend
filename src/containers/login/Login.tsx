import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleLogin} from 'react-google-login';
import {GOOGLE_CLIENT_ID} from '../../constants/config';

const responseGoogle = (response: any) => {
    console.log(response);
};

export default function login() {
    return (
        <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}
