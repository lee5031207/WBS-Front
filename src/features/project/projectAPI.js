import wbsAxios from '../../utils/wbsAxios';

export const createProjectAPI = async (data) => {
    try{
        const response = await wbsAxios.post('/api/projects', data);
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
        const response = await wbsAxios.get('/api/projects');
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
        const response = await wbsAxios.get(`/api/projects/${id}`);
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