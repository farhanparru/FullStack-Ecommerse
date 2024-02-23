const mongoose = require("mongoose")


const productschema = new mongoose.Schema({
     
     title:String, 
     description:String,
     price:Number,
     image:String,
     category:String,
     OldPrice:Number,
     ProcessorName:String,
     SSDCapacity:String,
     OperatingSystem:String,
     ScreenSize:String,
     BatteryBackup:String,
     quantity:String,

    


})

module.exports = mongoose.model("Product",productschema)