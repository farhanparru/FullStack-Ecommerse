const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require ('crypto')

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  } ,
  username: String,
  password: String,
 

  isActive: {
    type: Boolean,
    default: true, // or false, depending on your preference
  },

  tokens:[
    {
      token:{
        type:String,
        required:true,
      }
    }
  ],

  verifytoken:{
    type:String,
    
  },


  cart: [
  {
    productsId:{type: mongoose.Schema.ObjectId,ref: "Product" },
    quantity: { type: Number, default: 1 },
 
    

  } 
    ],
    
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.ObjectId, ref: "Orders" }],
 
});






// password encrpusiton this a security purposse
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hasedPassword = await bcrypt.hash(user.password, 10);
  user.password = hasedPassword;
  next();
});


//generate password reset Token
userSchema.methods.getResetPasswordToken = function(){
  //generate Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash and set  to resetPassword Token
   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

   //set Token expire Time

   this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

   return resetToken
}

module.exports = mongoose.model("User", userSchema);
