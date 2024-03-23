const Address = require('../models/addressSchema');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const cerateAddress = async (req, res) => {
    try {
        const token = req.header('Authorization');
       
        
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

      
        const decoded = jwt.verify(token, process.env.USER_ACCES_TOKEN_SECRET)
        const userId = decoded.userId


        const { name, email, number, state, district, pincode, street } = req.body;
        
        const address = await Address.findOne({ userId: userId });
        console.log(address,"ggg");

        if (address) {
            const data = await Address.findOneAndUpdate(
                { userId: userId },
                { $push: { Address: req.body } },
                { new: true }
            );
            res.send(data);
        } else {
            const data = await Address.create({
                Address: {
                    name: name,
                    email: email,
                    number: number,
                    state: state,
                    district: district,
                    pincode: pincode,
                    street: street,
                },
                userId: userId
            });
            console.log(data._id);
            res.send(data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failure",
            message: "Error",
            error_message: error.message
        });
    }
};


const getAddress = async (req, res) => {
  try {
      const token = req.header('Authorization');   

      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

  
          const decoded = jwt.verify(token, process.env.USER_ACCES_TOKEN_SECRET)
           const userId = decoded.userId;

          const address = await Address.findOne({ userId });

        console.log(address,"new");

          if (!address) {
              return res.status(404).json({ msg: "Address not found for this user" });
          }

          return res.status(200).json(address);
     
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: "Failure",
          message: "Error",
          error_message: error.message
      });
  }
};


const deleteAddress = async (req, res) => {
  try {
      const { email } = req.body;

      const token = req.header('Authorization');

      if (!token) {
          return res.status(401).json({ msg: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, process.env.USER_ACCES_TOKEN_SECRET);
      const userId = decoded.userId;

      const data = await Address.findOneAndUpdate(
          { userId: userId },
          { $pull: { Address: { email: email } } },
          { new: true }
      );
      

      if (!data) {
          return res.status(404).json({ msg: "Address not found for this user" });
      }

      console.log(data);
      return res.send(data);
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: "Failure",
          message: "Error",
          error_message: error.message
      });
  }
};
module.exports = {
    cerateAddress,
    getAddress,
    deleteAddress
};
