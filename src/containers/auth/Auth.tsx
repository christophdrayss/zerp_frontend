import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../index';
import {getMyInfo, logout} from './auth-slice';
import {useNavigate} from 'react-router-dom';
import {getOrders} from '../orders/orders-slice';
import {Space, Spin} from 'antd';

export default function Auth(props: PropsWithChildren) {
    const status = useSelector((state: RootState) => state.auth.authStatus);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getMyInfo());
        }
    }, []);

    return <>{status === 'idle' ? <Spin size="large" /> : props.children}</>;
}
