import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../login/Login';
import Orders from '../orders/Orders';
import Logs from '../logs/Logs';
import Logout from '../login/Logout';
import {RootState} from '../index';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import OrderDetail from '../orders/OrderDetail';
import NotFound from '../404-not-found/NotFound';

export default function Navigator() {
    // function AuthRequired({children, redirectTo}) {
    //     const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    //     return isLoggedIn ? children : <Navigate to={redirectTo} />;
    // }

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn]);

    return (
        <>
            <Routes>
                {/*<Route path="/logout" element={<Logout />} />*/}
                {/*<Route*/}
                {/*    path="/settings"*/}
                {/*    element={*/}
                {/*        <AuthRequired redirectTo="/login">*/}
                {/*            <Settings />*/}
                {/*        </AuthRequired>*/}
                {/*    }*/}
                {/*/>*/}

                {/*<Route path="/login" element={<Login />} />*/}
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/logs" element={<Logs />} />
                {/*<Route path="/404" element={<NotFound />} />*/}
                {/*<Route path="*" element={<Navigate to="/404" />} />*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
