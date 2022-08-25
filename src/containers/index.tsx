import {Provider} from 'react-redux';
import React from 'react';
import Navigator from './navigator/Navigator';
import {getStore} from '../services/redux';

export const store = getStore();

export default function App() {
    return (
        <Provider store={store}>
            <React.StrictMode>
                <div>
                    <Navigator />
                </div>
            </React.StrictMode>
        </Provider>
    );
}
