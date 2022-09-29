import {configureStore} from '@reduxjs/toolkit';
import {combinedReducer} from '../containers/reducer';
import {ENVIRONMENT} from '../constants/config';
import logger from 'redux-logger';

export function getStore() {
    let store = null;
    store = configureStore({
        reducer: combinedReducer,
        // @ts-ignore
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });

    return store;
}
