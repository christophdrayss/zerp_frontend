import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logout} from '../auth/auth-slice';

export default function Logout() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logout());
        navigate('/login');
    }, []);

    return <></>;
}
