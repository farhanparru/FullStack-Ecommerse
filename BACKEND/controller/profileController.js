const User = require('../models/UserSchema')
const Address = require('../models/addressSchema')

const addAddress = async(req,res)=>{
    try{
        const {name,phone,country,state,district,city,pincode,address}=req.body
      
        const token = req.header('x-auth-token')
        if(!token){
            return res.status(401).json({ msg: 'No token, authorization denied'})
        }
    }catch(error){
        
    }
}
