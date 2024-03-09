const mongoose = require("mongoose")
const mailSender = require('../utlis/mailSender')


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
      } ,
         
      otp:{   
        type:String,
        required:true,
      },

      createdAt:{
        type:Date,
        default: Date.now,
        expires:60*5 // The document will be automatically deleted after 5 minutes of its creation time
      }
  })

  async function sendVerification(email,otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP 👋</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );
        console.log('Email send successfully',mailResponse);
    }catch(error){
        console.log('Error occurred while sending email',error);
        throw error ;
    }
  }

  otpSchema.pre('save',async function (next){
     console.log('new document saved to the databse');

     if(this.isNew){
       await sendVerification(this.email,this.otp)
     }
    
     //Check if the OTP has expired

     const currentTime = new Date();
     console.log(currentTime);   
     const expiryTime = new Date(this.createdAt.getTime() + 2 * 60 * 1000); // Adding two minutes (2 * 60 * 1000 milliseconds)
     if (currentTime > expiryTime) {
         console.log('OTP has expired');   
     }
     


     next();
  });

  module.exports = mongoose.model("OTP",otpSchema)