import {Action, createSlice} from '@reduxjs/toolkit';
import {RootStateType} from '../reducer';

import network from '../../services/network';
import {Button, message, Space} from 'antd';
import {AppDispatch, RootState} from '../index';

const Orders = createSlice({
    name: 'logs',
    initialState: {
        logs: [],
        logsCount: 0,
    },
    reducers: {
        getLogsSuccess(state, action) {
            state.logs = action.payload.logs;
            state.logsCount = action.payload.logsCount;
        },
    },
});

export const getLogs = (page: number, pageSize: number) => (dispatch: any, getState: RootState) => {
    network
        .fetch('GET', `/logs?page=${page - 1}&pageSize=${pageSize}`, null)
        .then((res: any) => {
            dispatch(getLogsSuccess(res.data));
        })
        .catch(async (e) => {
            await message.error(e.message);
        });
};

export const {getLogsSuccess} = Orders.actions;
export default Orders.reducer;
