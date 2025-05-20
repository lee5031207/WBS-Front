import wbsAxios from '../../utils/wbsAxios';

export const searchUserAPI = async (params) => {
    try{
        const response = await wbsAxios.get('/api/users', {
            params : params
        });
        /*
        console.log("=====searchUserAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getUserAPI = async (id) => {
    try{
        const response = await wbsAxios.get(`/api/users/${id}`);
        /*
        console.log("=====getUserAPI RESULT=====")
        console.log(response);
        console.log("====================")
        */
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}