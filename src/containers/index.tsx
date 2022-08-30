import {Provider} from 'react-redux';
import React from 'react';
import Navigator from './navigator/Navigator';
import {getStore} from '../services/redux';
import 'antd/dist/antd.css';
import ParentLayout from './parent-layout/ParentLayout';

export const store = getStore();

export default function App() {
    return (
        <Provider store={store}>
            <React.StrictMode>
                <ParentLayout />
            </React.StrictMode>
        </Provider>
    );
}
