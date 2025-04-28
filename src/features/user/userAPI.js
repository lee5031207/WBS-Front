import axios from 'axios';
import { getToken } from '../../utils/token';

const BASE_URL = 'http://localhost:8081/api/users';
const token = getToken();

export const searchUserAPI = async (params) => {
    try{
        const response = await axios.get(BASE_URL, {
            params : params,
            headers:{
                "Authorization" : token,
                "Content-Type" : "application/json"
            }
        })
        console.log("=====API RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}