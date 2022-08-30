import axios from 'axios';
import {API_BASE_URL} from '../constants/config';

console.log('Created Axios Instance');
axios.defaults.withCredentials = true;
export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

export default {
    fetch: (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data: any = null) => {
        return new Promise(function (resolve, reject) {
            if ((method === 'POST' || method === 'PUT') && data) {
                axiosClient
                    .request({
                        url,
                        method,
                        data,
                    })
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            reject(error?.response?.data);
                        }
                    });
            } else {
                axiosClient
                    .request({
                        url,
                        method,
                    })
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            reject(error);
                        }
                    });
            }
        });
    },
};
