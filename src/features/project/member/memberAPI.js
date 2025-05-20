import wbsAxios from '../../../utils/wbsAxios';

export const createMemberAPI = async (data, projectId) => {
    try{
        const response = await wbsAxios.post(`/api/projects/${projectId}/members`, data);
        /*
        console.log("=====createMemberAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getMemberListAPI = async (projectId) => {
    try{
        const response = await wbsAxios.get(`/api/projects/${projectId}/members`);
        /*
        console.log("=====getMemberListAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getMemberDetailAPI = async (projectId, prjMemId) => {
    try{
        const response = await wbsAxios.get(`/api/projects/${projectId}/members/${prjMemId}`);
        /*
        console.log("=====getMemberDetailAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const updateMemberAPI = async (projectId, prjMemId, data) => {
    try{
        const response = await wbsAxios.patch(`/api/projects/${projectId}/members/${prjMemId}`, data);
        /*
        console.log("=====updateMemberAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }

}