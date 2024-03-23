const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,     
  } ,
  username: String,
  password: String,     
  googleId:String,
  displayName:String,       
  image:String,
 
 

  isActive: {
    type: Boolean,
    default: true, // or false, depending on your preference
  },



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
 
},{timestamps:true});






// password encrpusiton this a security purposse
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hasedPassword = await bcrypt.hash(user.password, 10);
  user.password = hasedPassword;
  next();
});



module.exports = mongoose.model("User", userSchema);
