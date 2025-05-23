import axios from 'axios';
import { getToken } from './token';

const wbsAxios = axios.create({
    baseURL : '',
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

//response 후 interceptor
wbsAxios.interceptors.response.use((response) => response,
async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try{
            const res = await axios.post("/api/auth/refresh",{},{
                withCredentials: true
            });
            localStorage.setItem('WBS_GRANT_TYPE', res.data.grantType);
            localStorage.setItem('WBS_ACCESS_TOKEN', res.data.accessToken);

            originalRequest.headers.Authorization = res.data.grantType+" "+res.data.accessToken;
            return wbsAxios(originalRequest);
        }catch(e){
            // refresh 실패 시 로그아웃 처리 등
            localStorage.removeItem('WBS_GRANT_TYPE');
            localStorage.removeItem('WBS_ACCESS_TOKEN');
            alert("다시 로그인 하십시오.");
            window.location.href = "/login";
        }
    }
});




export default wbsAxios;