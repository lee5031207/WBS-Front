import axios from 'axios';
import { getToken } from '../../utils/token';

const BASE_URL = 'http://localhost:8081/api/users';

export const searchUserAPI = async (params) => {
    try{
        const response = await axios.get(BASE_URL, {
            params : params,
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====searchUserAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getUserAPI = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getUserAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}