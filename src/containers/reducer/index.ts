import {combineReducers} from 'redux';
import Login from '../login/login-slice';
import Log from '../logs/logs-slice';
import Auth from '../auth/auth-slice';

export const combinedReducer = combineReducers({
    login: Login,
    log: Log,
    auth: Auth,
});
export type RootStateType = ReturnType<typeof combinedReducer>;
