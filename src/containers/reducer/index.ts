import {combineReducers} from 'redux';
import Login from '../login/login-slice';
import Log from '../logs/logs-slice';
import Auth from '../auth/auth-slice';
import Order from '../orders/orders-slice';

export const combinedReducer = combineReducers({
    login: Login,
    log: Log,
    auth: Auth,
    order: Order,
});
export type RootStateType = ReturnType<typeof combinedReducer>;
