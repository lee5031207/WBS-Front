import axios from 'axios';
import { getToken } from "../../../utils/token";

export const createMemberAPI = async (data, projectId) => {
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/members`;
        const response = await axios.post(BASE_URL, data, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        console.log("=====createMemberAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getMemberListAPI = async (projectId) => {
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/members`;
        const response = await axios.get(BASE_URL, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        console.log("=====getMemberListAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getMemberDetailAPI = async (projectId, prjMemId) => {
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/members/${prjMemId}`;
        const response = await axios.get(BASE_URL, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        console.log("=====getMemberDetailAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const updateMemberAPI = async (projectId, prjMemId, data) => {
    try{
        const BASE_URL = `http://localhost:8081/api/projects/${projectId}/members/${prjMemId}`;
        const response = await axios.patch(BASE_URL, data, {
            headers:{
                "Authorization" : getToken(),
                "Content-Type" : "application/json"
            }
        })
        console.log("=====updateMemberAPI RESULT=====")
        console.log(response);
        console.log("====================")
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }

}