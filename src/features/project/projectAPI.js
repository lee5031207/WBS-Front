import axios from 'axios';
import { getToken } from '../../utils/token';

const BASE_URL = 'http://localhost:8081/api/projects';

export const createProjectAPI = async (data) => {
    try{
        const response = await axios.post(BASE_URL, data, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====createProjectAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getProjectListAPI = async () => {
    try{
        const response = await axios.get(BASE_URL, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getProjectListAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getProjectInfoAPI = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getProjectInfoAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}