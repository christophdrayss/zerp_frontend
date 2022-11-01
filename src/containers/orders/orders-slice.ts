import {Action, createSlice} from '@reduxjs/toolkit';
import {RootStateType} from '../reducer';

import network from '../../services/network';
import {Button, message, Space} from 'antd';
import {AppDispatch, RootState} from '../index';

const Orders = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        orderDetail: undefined,
    },
    reducers: {
        getOrdersSuccess(state, action) {
            state.orders = action.payload;
        },
        getOrderDetailSuccess(state, action) {
            state.orderDetail = action.payload;
        },
    },
});

export const getOrders = (date: string) => (dispatch: AppDispatch, getState: RootState) => {
    network
        .fetch('GET', `/orders?after=${date}`, null)
        .then((res: any) => {
            dispatch(getOrdersSuccess(res.data));
        })
        .catch(async (e) => {
            await message.error(JSON.stringify(e));
        });
};

export const updateTracking =
    (orderId: string, trackingNumber: string, returnTrackingNumber: string) => (dispatch: AppDispatch, getState: RootState) => {
        let data = {
            orderId,
            trackingNumber,
            returnTrackingNumber,
        };
        network
            .fetch('POST', `/orderProcessing`, data)
            .then((res: any) => {
                message.success('successfully updated the tracking number');
            })
            .catch(async (e) => {
                await message.error(JSON.stringify(e));
            });
    };

export const updateStatus =
    (orderId: string, orderItemId: string, orderLineId: string, reason: string, status: string) =>
    (dispatch: AppDispatch, getState: RootState) => {
        let data = {
            orderId,
            orderItemId,
            orderLineId,
            reason,
            status,
        };
        network
            .fetch('POST', `/orderLineProcessing`, data)
            .then((res: any) => {
                message.success('successfully updated the status');
            })
            .catch(async (e) => {
                await message.error(JSON.stringify(e));
            });
    };

export const getOrderFromState = (orderId: any) => (dispatch: AppDispatch, getState: any) => {
    let orders = getState().order.orders;
    // @ts-ignore
    let orderDetail = orders.find((obj) => obj.id === orderId);
    dispatch(getOrderDetailSuccess(orderDetail));
};

export const {getOrdersSuccess, getOrderDetailSuccess} = Orders.actions;
export default Orders.reducer;
