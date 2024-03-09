import { handleError } from "./configuration";

import axios from "axios";

export const URL =  process.env.REACT_APP_API_URL;

const apiInstance = axios.create({
    baseURL:URL,
})

apiInstance.interceptors.response.use((response)=>{
    return response.data;
})

export const commonReduxRequest = async (
   method,
   route,
   body,
   config,
   rejectWithValue,

) =>{
    let requestConfig = {
        method,
        url:route,
        data:body,
        headers:config,
        withCredentials:true,
        
    }
    try{
        const response = await apiInstance(requestConfig)

        return response
    }catch(error){
        console.log(error);
        return handleError(error,rejectWithValue)
    }
}

export const commonRequest = async (method,route,body,config)=>{
    let requestConfig={
        method,
        url:route,
        data:body,
        headers:config,
        withCredentials:true,
    }

    try{
        const response = await apiInstance(requestConfig)
        return response
    }catch(error){
        console.log(error);
        return error
    }
}