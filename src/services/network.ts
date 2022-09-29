import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_BASE_URL} from '../constants/config';

export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

axiosClient.interceptors.request.use(
    async (req: AxiosRequestConfig) => {
        console.log(`${req.method} ${req.url}`);
        if (req.headers) {
            req.headers['x-access-token'] = localStorage.getItem('jwt') as string;
        }
        return req;
    },
    function (error) {
        console.error(`Request error interceptor: ${error}`);
        // Do something with request error
        return Promise.reject(error);
    },
);

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
                    .then(function (response: AxiosResponse<any>) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        if (error) {
                            reject(error);
                        }
                    });
            } else {
                axiosClient
                    .request({
                        url,
                        method,
                    })
                    .then(function (response: AxiosResponse<any>) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        if (error) {
                            reject(error);
                        }
                    });
            }
        });
    },
};
