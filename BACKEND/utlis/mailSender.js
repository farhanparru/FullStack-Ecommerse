const nodemailer = require('nodemailer')

const mailerSender = async (email,title,body)=>{
    try{
        //Create transporter to send emails 
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            auth:{
              user:"shaminmuhammad116@gmail.com",
              pass:"uoygfeypjmdobbek"
            }
        });

       let info = await transporter.sendMail({
         from:`"verifyi your email" <shaminmuhammad116@gmail.com>"`,
         to:email,
         subject:title,
         html:body,
       })

    
       return info

    }catch(error){
        console.log(error.message);
    }
};
module.exports = mailerSender