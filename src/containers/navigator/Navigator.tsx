import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../login/Login';
import Orders from '../orders/Orders';

export default function Navigator() {
    // function AuthRequired({children, redirectTo}) {
    //     const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    //     return isLoggedIn ? children : <Navigate to={redirectTo} />;
    // }
    return (
        <>
            <BrowserRouter>
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
                    <Route path="/dashboard/orders" element={<Orders />} />
                    {/*<Route path="/" element={<Navigate to="/providers" />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}
