import {configureStore} from '@reduxjs/toolkit';
import {combinedReducer} from '../containers/reducer';
import logger from 'redux';
import {ENVIRONMENT} from '../constants/config';

export function getStore() {
    let store = null;
    if (ENVIRONMENT !== 'production') {
        store = configureStore({
            reducer: combinedReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        });
    } else {
        store = configureStore({
            reducer: combinedReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        });
    }
    return store;
}
