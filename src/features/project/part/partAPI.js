import wbsAxios from "../../../utils/wbsAxios";

export const createPartAPI = async (data, projectId) => {
    try{
        const response = await wbsAxios.post(`/api/projects/${projectId}/parts`, data);
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
        const response = await wbsAxios.get(`/api/projects/${projectId}/parts`);
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
        const response = await wbsAxios.get(`/api/projects/${projectId}/parts/${partId}`);
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

