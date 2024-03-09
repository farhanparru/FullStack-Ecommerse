
export const config = {
    headers :{
        'Content-Type':"application/json"
    },

    withCredentials:true,
 };

 export const appJson = {
    'Content/Type':"application/json"
 };

 export const handleError = (error,rejectWithValue)=>{
    if(error.response && error.response.data.error){
         console.log(error.response.data.error);

         return rejectWithValue(error.response.data.error)
    }else{
        return rejectWithValue(error.message)
    }
 }