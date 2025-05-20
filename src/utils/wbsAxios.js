import axios from 'axios';
import { getToken } from './token';

const wbsAxios = axios.create({
    baseURL : 'http://localhost:8081',
    headers : {
        "Content-Type" : "application/json"
    }
})

//request 전 interceptor
wbsAxios.interceptors.request.use(config => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});




export default wbsAxios;