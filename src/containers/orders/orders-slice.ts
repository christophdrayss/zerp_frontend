import {Action, createSlice} from '@reduxjs/toolkit';
import {RootStateType} from '../reducer';

import network from '../../services/network';
import {Button, message, Space} from 'antd';
import {AppDispatch, RootState} from '../index';

const Orders = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
    },
    reducers: {
        getOrdersSuccess(state, action) {
            state.orders = action.payload;
        },
    },
});

export const getOrders = (date: string) => (dispatch: AppDispatch, getState: RootState) => {
    network
        .fetch('GET', `/orders?after=${date}`, null)
        .then((res: any) => {
            console.log(res.data);
        })
        .catch(async (e) => {
            await message.error(JSON.stringify(e));
        });
};

export const {getOrdersSuccess} = Orders.actions;
export default Orders.reducer;
