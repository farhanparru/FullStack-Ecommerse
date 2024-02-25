const User = require("../models/UserSchema")


const getUser = async (req,res)=>{
    try{
        const users =  await User.find() 
        if(users){
             return res.render('')
        }
    }catch(error){
        
    }
 
}