require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserSchema");
const productSchema = require("../models/productSchema");
const { joiProductSchema } = require("../models/validationSchema");
const Order = require("../models/orderSchema");

module.exports = {
  //->admin login

  login: async (req, res) => {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      //impliment Jwt Token admin login
      const token = jwt.sign(
        { email: email },
        process.env.ADMIN_ACCESS_TOKEN_SECRET
      );

      console.log(token, "fal");

      return res.status(200).send({
        status: "Succes",
        message: "Admin register Succes Fully 🙌 🎉",
        data: token,
      });
    } else {
      return res.status(404).json({
        status: "Error",
        message: "This is No admin 🧐",
      });
    }
  },

  //->finding all users

  allUsers: async (req, res) => {
    const allUsers = await UserSchema.find();
    console.log(allUsers);
    if (allUsers.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Users not Found 🤔🧐🤨❓❔ ",
      });
    }
    res.status(200).json({
      status: "SuccesFully",
      message: "SuccesFuly fetched user data ✅",
      data: allUsers,
    });
  },

  //-> user Block or unblock
  userBlock: async (req, res) => {
    try {
      const userId = req.body.userId;
      const user = await UserSchema.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.isActive = !user.isActive;
      await user.save();

      res
        .status(200)
        .json({
          message: "User status updated successfully",
          isActive: user.isActive,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //->View a specific user details by id

  userById: async (req, res) => {
    const userId = req.params.id;
    const user = await UserSchema.findById(userId);
    console.log(user);
    if (!user) {
      return (
        res.status(404),
        json({
          status: "error",
          message: "User note Found 4️⃣0️⃣4️⃣",
        })
      );
    }
    res.status(200).send({
      status: "Succes",
      message: "SuccesFuly find user",
      data: user,
    });
  },

  //->Create Product

  creatProduct: async (req, res) => {
    console.log(req.body);
    const {
      title,
      description,
      price,
      image,
      category,
      OldPrice,
      ProcessorName,
      SSDCapacity,
      OperatingSystem,
      ScreenSize,
      BatteryBackup,
      quantity,
    } = req.body;
    console.log(image);
    const data = await productSchema.create({
      title,
      description,
      price,
      image,
      category,
      OldPrice,
      ProcessorName,
      SSDCapacity,
      OperatingSystem,
      ScreenSize,
      BatteryBackup,
      quantity,
    });

    res.status(201).json({
      status: "success",
      message: "product successfully created",
      data: data,
    });
  },

  //->view all the products by category
  allProducts: async (req, res) => {
    const prods = await productSchema.find();

    if (!prods) {
      return (
        res.status(404),
        send({
          status: "error",
          message: "Products not found",
        })
      );
    }
    res.status(200).json({
      status: "success",
      message: "Succesfully fetched products detail",
      data: prods,
    });
  },

  //->View a specific product.

  productsById: async (req, res) => {
    const producId = req.params.id;
    const product = await productSchema.findById(producId);
    if (!product) {
      return res.status(404).send({
        status: "error",
        message: "Product note found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched product details",
      data: product,
    });
  },

  //-> Delete Producte

  delteProduct: async (req, res) => {
    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid productId provided",
      });
    }

    const deleteProduct = await productSchema.findOneAndDelete({
      _id: productId,
    });

    if (!deleteProduct) {
      return res.status(404).json({
        status: "failure",
        message: "product not found in the database",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Producte deleted SuccessFully",
    });
  },

  //-> Admin Update Producte

  //  updateProduct: async (req,res)=>{
  //   console.log(req.body)
  //   // const prdt = productSchema.findById(req.params.id)
  //   // const {value,error } = joiProductSchema.validate(req.body);
  //   // console.log("value",value);

  //   // if(error){
  //   //    return res.status(401).send({message:error.details[0].message})
  //   // }
  //   const {id,title,discription,price,image,category}=req.body
  //   // console.log("value",value);

  //   const product = await  productSchema.find()

  //   if(!product){
  //     return res
  //     .send(404)
  //     .json({status:"Failer",message:"Producte not found in database"})
  //   }

  //   await productSchema.findByIdAndUpdate(
  //     {_id: id},
  //     {
  //       title,
  //       discription,
  //       price,
  //       image,
  //       category,
  //     }
  //   );

  //   res
  //   .status(200)
  //   .json({status:"Success",message:"Product success fully update"})
  //  }
  updateProduct: async (req, res) => {
    const {
      title,
      description,
      price,
      image,
      category,
      OldPrice,
      ProcessorName,
      SSDCapacity,
      OperatingSystem,
      BatteryBackup,
      id,
    } = req.body;

    console.log(image);

    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).json({ Error: "Product note a found" });
    }
    await productSchema.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          price: price,
          image: image,
          category: category,
          OldPrice: OldPrice,
          ProcessorName: ProcessorName,
          SSDCapacity: SSDCapacity,
          OperatingSystem: OperatingSystem,
          BatteryBackup: BatteryBackup,
        },
      }
    );
    res.status(201).json({
      status: "success",
      message: "Successfuly update the product",
    });
  },

  //->Admin Order deteails

  orderDetials: async (req, res) => {
    const products = await Order.find();
    console.log(products, "pppp");

    if (products.length === 0) {
      return res.status(200).json({
        message: "No Product",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "SuccessFuly fethed order deteails",
      products,
    });
  },

  viewOder: async (req, res) => {
    const producId = req.params.id;

    try {
      const orders = await Order.findById(producId).populate("products");

      if (orders.length === 0) {
        return res.status(200).json({
          message: "No Orders",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully fetched order details",
        orders,
      });
    } catch (error) {
      console.log("Error fetching order deteails", error);
      res.status(500).json({
        status: "Error",
        message: "Internel server errror",
      });
    }
  },
};
