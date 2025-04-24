import axios from 'axios';
import { getToken } from '../../utils/token';

const BASE_URL = 'http://localhost:8081/api/projects';
const token = getToken();

export const createProjectAPI = async (data) => {
    try{
        const response = await axios.post(BASE_URL, data, {
            headers:{
                "Authorization" : token,
                "Content-Type" : "application/json"
            }
        })
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}