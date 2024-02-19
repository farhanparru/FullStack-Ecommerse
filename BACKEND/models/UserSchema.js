const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
     
      email:String,
      username:String,
      password:String,
      confirom:String,
   cart:[
      {type: mongoose.Schema.ObjectId,ref:"Product"}
   ],
   wishlist:[{type:mongoose.Schema.ObjectId,ref:"Product"}],
   quantity:{type:Number,default:1},
   orders:[{type:mongoose.Schema.ObjectId,ref:'Orders'}]
})

// password encrpusiton this a security purposse
userSchema.pre("save", async function(next) {
      const user = this;
      if(!user.isModified("password")) return next()

      const hasedPassword = await bcrypt.hash(user.password,10)
      user.password = hasedPassword
      next()
})

module.exports = mongoose.model("User", userSchema)