import {combineReducers} from 'redux';
import Login from '../login/login-slice';

export const combinedReducer = combineReducers({
    login: Login,
});
