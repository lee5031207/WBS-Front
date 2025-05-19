import axios from 'axios';
import { getToken } from '../../../utils/token';

const BASE_URL = 'http://localhost:8081/api/projects';

export const getWbsDateInfo = async (projectId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${projectId}/wbs/date-info`, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getWbsDateInfo RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getWbsData = async (projectId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${projectId}/wbs`, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        /*
        console.log("=====getWbsData RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

