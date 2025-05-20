import wbsAxios from '../../../utils/wbsAxios';

export const updateTaskAPI = async (projectId, data) => {
    try{
        const response = await wbsAxios.patch(`/api/projects/${projectId}/tasks`, data);
        /*
        console.log("=====updateTaskAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const createTaskAPI = async (projectId, data) => {
    try{
        const response = await wbsAxios.post(`/api/projects/${projectId}/tasks`, data);
        /*
        console.log("=====createTaskAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getTaskDscendantsAPI = async (projectId, taskId) => {
    try{
        const response = await wbsAxios.get(`/api/projects/${projectId}/tasks/${taskId}/descendants`);
        /*
        console.log("=====getTaskDscendantsAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const deleteTaskAPI = async (projectId, taskId) => {
    try{
        const response = await wbsAxios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
        /*
        console.log("=====getTaskDscendantsAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}