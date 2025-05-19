import axios from 'axios';
import { getToken } from "../../../utils/token";

export const createPartAPI = async (data, projectId) => {
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/parts`;
        const response = await axios.post(BASE_URL, data, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====createPartAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getPartListAPI = async (projectId) => {
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/parts`;
        const response = await axios.get(BASE_URL, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getPartListAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getPartDetailAPI = async (projectId, partId) =>{
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/parts/${partId}`;
        const response = await axios.get(BASE_URL, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getPartDetailAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

