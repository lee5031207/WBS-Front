import axios from 'axios';
import { getToken } from '../../../utils/token';

const BASE_URL = 'http://localhost:8081/api/projects';
const token = getToken();

export const updateTaskAPI = async (projectId, data) => {
    try{
        const response = await axios.patch(`${BASE_URL}/${projectId}/tasks`, data, {
            headers:{
                "Authorization" : token,
                "Content-Type" : "application/json"
            }
        })
        console.log("=====updateTaskAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const createTaskAPI = async (projectId, data) => {
    try{
        const response = await axios.post(`${BASE_URL}/${projectId}/tasks`, data, {
            headers:{
                "Authorization" : token,
                "Content-Type" : "application/json"
            }
        })
        console.log("=====createTaskAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getTaskDscendantsAPI = async (projectId, taskId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${projectId}/tasks/${taskId}/descendants`, {
            headers:{
                "Authorization" : token,
                "Content-Type" : "application/json"
            }
        })
        console.log("=====getTaskDscendantsAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}