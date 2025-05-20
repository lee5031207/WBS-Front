import wbsAxios from '../../../utils/wbsAxios';

export const getWbsDateInfo = async (projectId) => {
    try{
        const response = await wbsAxios.get(`/api/projects/${projectId}/wbs/date-info`);
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
        const response = await wbsAxios.get(`/api/projects/${projectId}/wbs`);
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

