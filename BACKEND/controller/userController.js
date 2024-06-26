//Schmea imported
const User = require("../models/UserSchema");
const product = require("../models/productSchema");
const Order = require("../models/orderSchema");
const userOtp = require("../models/otpModel");
const { joiUserSchema } = require("../models/validationSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //Json Web Token Security puropsse
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let sValue = [];

//->  email configuration

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SM_EMAIL1,
    pass: process.env.SM_PASSWORD1,
  },
});

//-> send emails to users

module.exports = {
  //->new User Register
  userSignup: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);
    const { email, username, password, confirm } = req.body;
  
    if (error) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid user input ☹️. Please check your data. 🙂",
      });
    }
  
    try {
      // Check if User already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }
  
      // Check if password and confirm password match
      if (password !== confirm) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password do not match",
        });
      }
  
      // Create new User
      const newUser = await User.create({
        email,
        username,
        password,
      });
  
      return res.status(200).json({
        status: "success",
        message: "User registration successful 😊",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  },
  
  

  //->user Login Jwt Web Token
  userLogin: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    //otp with login  send message  function

    if (user) {
      const OTP = Math.floor(1000 + Math.random() * 9000);
      const existEmail = await userOtp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userOtp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );

        await updateData.save();

        const mailOptions = {
          from: process.env.SM_EMAIL1,
          to: email,
          subject: "Sending Email For Otp validation",
          html: `<h1>Please confirm Your OTP Validate 5 minute:-${OTP}</h1>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "Email Note Send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new userOtp({
          email,
          otp: OTP,
        });
        await saveOtpData.save();

        const mailOptions = {
          from: process.env.SM_EMAIL1,
          to: email,
          subject: "Sending Email For Otp validation",
          html: `<h1>Please confirm Your OTP Validate 5 minute:-${OTP}</h1>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {      
            console.log("error", error);
            res.status(400).json({ error: "Email Note Send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "This User Not Exist In Our Db " });
    }

   

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not fount 🧐",
      });
    }

    //check user block and unBlock
    if (!user.isActive) {
      return res
        .status(403)
        .json({
          error:
            "User account has been blocked. Please contact the administrator.",
        });
    }

    if (!password || !user.password) {
      return res
        .status(401)
        .json({ error: "errore", message: "Invalid Input" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res
        .status(401)
        .json({ error: "error", message: "Incorrect password  🔐" });
    }
    
    res.status(200).json({
      status: "succes",
      message: "Login Successful.",
      
    });
  },

 //-> userVerify otp with login
    
 userVerifyOtp:async(req,res)=>{
   const {email,otp} = req.body;

   const user = await User.findOne({
    email: email,
  });


   if(!otp || !email){
     res.status(400).json({error:"Please Enter Your OTP and email"})
   }

   try{

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({error:"User Note Found"})
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.USER_ACCES_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    

   
    const Email = user.email;
    const user1 = user._id;        


     // verify Otp from the user
    const otpverification = await userOtp.findOne({email})
    if(!otpverification){
      return res.status(400).json({error:"No OTP generated for this Email"})
    }

    // Check if OTP has expired
if (otpverification.createdAt < new Date(Date.now() - 300000)) {
  // 300000 milliseconds = 5 minutes
  return res.status(400).json({ error: "OTP has expired" });
}


      if(otpverification.otp === otp){  
      res.status(200).json({
        data: token,
        Email: Email,
        userId: user1,
        message: "User Login Successfully Done"
      })

    }else{
       res.status(400).json({error:"Invalid Otp"})
    }
   }catch(error){
    res.status(400).json({error:"Invalid Details",error})

   }
 },






  // -> send Email link for reset Password

  sendpasswordlink: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" });
      }

      const userfind = await User.findOne({ email: email });

      //-> token generate reset password

      const token = jwt.sign(
        { _id: userfind._id },
        process.env.USER_ACCES_TOKEN_SECRET,
        {
          expiresIn: "120s",
        }
      );

      const setUserToken = await User.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: token },
        { new: true }
      );
    
      if (setUserToken) {   
        const mailOptions = {             
          from: "shaminmuhammad116@gmail.com",
          to: email,
          subject: "Sending Email For password Reset",
          text: `This Link  Valid For 2 MINUTES http://localhost:3001/forgotpassword/${userfind.id}/${setUserToken.verifytoken}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(401).json({ status: 401, message: "email not send" });
          } else {
            console.log("Email send", info.response);
            res
              .status(201)
              .json({ status: 201, message: "Email sent Successfully" });
          }
        });
      }
      res
        .status(201)
        .json({ message: "Password reset link sent successfully" });
    } catch (error) {
      res.status(401).json({ status: 401, message: "Invalid user" });
    }
  },

  // verifyi user forgotPassword time

  forgotpassword: async (req, res) => {
    const { id, token } = req.params;

    try {
      const validUser = await User.findOne({ _id: id, verifytoken: token });

      const verifyToken = jwt.verify(
        token,
        process.env.USER_ACCES_TOKEN_SECRET
      );
      //  console.log(verifyToken,"verifyToken");

      if (validUser && verifyToken._id) {
        res.status(201).json({ status: 201, validUser });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  },

  //-> change password

  changePassword: async (req, res) => {
    const { id, token } = req.params;

    const { password, confirm } = req.body;

    if (password !== confirm) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    try {
      const validUser = await User.findOne({ _id: id, verifytoken: token });

      const verifyToken = jwt.verify(
        token,
        process.env.USER_ACCES_TOKEN_SECRET
      );

      if (validUser && verifyToken._id) {
        const newpassword = await bcrypt.hash(password, 12);

        const setnewuserpass = await User.findByIdAndUpdate(
          { _id: id },
          { password: newpassword }
        );
        setnewuserpass.save();

        res.status(201).json({ status: 201, setnewuserpass });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  },

  //->verifayi user login
  verifayiUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "user note found" });
      }

      //if user is blocked send error response
      if (!user || !user.isActive) {
        return res
          .status(403)
          .json({
            error:
              "Your account has been blocked. Please contact the administrator.",
          });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Inavalid email or password" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.USER_ACCES_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      // Send success response with token
      res
        .status(200)
        .json({ message: "User authenticated successfully", token });
    } catch (error) {}
  },

  //->AllProducts
  allProducts: async (req, res) => {
    const products = await product.find();
    if (!products) {
      res.status(404).send({ status: "error", message: "product note found" });
    }

    res.status(200).send({
      status: "Success",
      message: "Success fully fetched data",
      data: products,
    });
  },

  //->view product by category
  viewProduct: async (req, res) => {
    const products = await product.find();
    if (!products) {
      res.status(404).send({ status: "error", message: "product note found" });
    }

    //   console.log(products);

    res.status(200).send({
      status: "succes",
      message: "Success Fully fetched data",
      data: products,
    });
  },

  //->View a specific product.
  productById: async (req, res) => {
    const productId = req.params.id;
    const prod = await product.findById(productId);
    //  console.log(prod);
    if (!prod) {
      return res.status(404).json({
        status: "error",
        message: "Product note Found",
      });
    }
    res.status(200).json({
      status: "product fetched successfully✅",
      data: prod,
    });
  },

  // ->product by category

  productsByCatogery: async (req, res) => {
    const prodCatogery = req.params.categoryname;
    console.log(prodCatogery, "hai");
    const products = await product.find({ category: prodCatogery });
    if (!products) {
      return res.status(404).send({
        status: "error",
        message: "Product note found",
      });
    }
    res.status(200).send({
      status: "SuccessFully",
      message: "Product Category Fetched ✅",
      data: products,
    });
  },
  //->User add to Cart

  addToCart: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({
          status: "Failure",
          message: "User Not Found 🚫",
        });
      }

      const { productId } = req.body;
      if (!productId) {
        return res.status(404).send({
          status: "Failure",
          message: "Product not found ☹️",
        });
      }

      // Ensure cart is initialized
      if (!user.cart) {
        user.cart = [];
      }

      const isProductInCart = user.cart.some((item) =>
        item.productsId.equals(productId)
      );
      if (isProductInCart) {
        return res.status(400).send({
          status: "Failure",
          message: "Product is already in the cart",
        });
      }

      const check = await User.updateOne(
        { _id: userId },
        { $addToSet: { cart: { productsId: productId } } }
      );
      res.status(200).json({
        status: "success",
        message: "Product successfully added to cart",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  },

  //-> view product from a cart
  viewCartProduct: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    // console.log(user,'useerrr');
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failer", message: " User Note Found" });
    }

    const cartProductIds = user.cart;

    if (cartProductIds.length === 0) {
      return res
        .status(200)
        .json({ status: "Succes", message: "User Cart is Emty 🛒", data: [] });
    }

    const cartProducts = await User.findOne({ _id: userId }).populate(
      "cart.productsId"
    );
    res.status(200).json({
      status: "Success",
      message: "Cart products fetched successfully",
      data: cartProducts.cart,
    });
  },

  //-> updateCartItemQuantity

  updateCartItemQuantity: async (req, res) => {
    const userID = req.params.id;
    const { id, quantityChange } = req.body;
    // console.log(id,"idd");
    const user = await User.findById(userID);

    // console.log(user,"user");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItem = user.cart.id(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cartItem.quantity += quantityChange;

    if (cartItem.quantity > 0) {
      await user.save();
    }
    res.status(201).json({
      status: "success",
      message: "Cart item quantity updated",
      data: user.cart,
    });
  },

  removeCartProduct: async (req, res) => {
    const userId = req.params.id;
    const productId = req.body.productId;

    try {
      await User.updateOne(
        { _id: userId },
        { $pull: { cart: { productsId: productId } } }
      );
      res.status(201).json({
        status: "success",
        message: "Product removed from the cart.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to remove product from the cart.",
        error: error.message,
      });
    }
  },

  //-> Add Product to Wish list

  addToWishlist: async (req, res) => {
    //Extracting User ID from Request Parameters:
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(404)
        .json({ status: "Failer", message: "User Note Found" });
    }
    console.log(userId);
    //Extracting Product ID from Request Body:
    const { productId } = req.body;

    const products = await product.findById(productId);

    if (!products) {
      return res.status(404).json({ message: "Product note found" });
    }

    //It then checks if the user already has the specified product in their wishlist by querying the User model
    const findproducts = await User.findOne({
      _id: userId,
      wishlist: productId,
    });
    //  console.log(findproducts);
    if (findproducts) {
      return res
        .status(409)
        .json({ message: "Product already on Your wishlist" });
    }

    //If the product is not already in the wishlist, it updates the user document in the database by pushing the product ID into the wishlist array.
    await User.updateOne({ _id: userId }, { $push: { wishlist: products } });
    res.status(201).json({
      status: "Success",
      message: "Product SuccesFully added to wishlist",
    });
  },
  // ->Show wishlist
  showWishlist: async (req, res) => {
    //Extracting User ID from Request Parameters:
    const userId = req.params.id;
    // console.log(userId,"swjk");
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failer", message: "User Note found" });
    }
    //It then checks if the user's wishlist is empty.
    const wishProdId = user.wishlist;
    // console.log(wishProdId,"shjkdh");

    if (wishProdId.length === 0) {
      return res
        .status(200)
        .json({
          status: "Success",
          message: "User Wishlist is Emty",
          data: [],
        });
    }
    //If the wishlist is not empty, it proceeds to fetch the products in the wishlist using the product IDs stored in the wishProId array.
    const wishProducts = await product.find({ _id: { $in: wishProdId } });

    res.status(200).json({
      status: "Success",
      message: "Wishlist products fetched SuccessFully",
      date: wishProducts,
    });
  },     

  //-> delete wishlist products

  deleteWishlist: async (req, res) => {
    //Extracting User ID and Product ID from Request:
    const userId = req.params.id;
    const { productId } = req.body;
    if (!productId) {
      return res.status(404).json({ message: "Product note found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "Failer", message: "User Note Found" });
    }
    //It proceeds to update the user document in the database, using $pull to remove the specified product ID from the wishlist array.
    await User.updateOne({ _id: userId }, { $pull: { wishlist: productId } });
    res.status(200).json({ status: "Successfully removed from wishlist" });
  },

  //-> Payments user purchase
  payment: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId }).populate(
      "cart.productsId"
    );

    if (!user) {
      return res.status(404).json({ message: "User Note Found" });
    }

    const cartProducts = user.cart;

    if (cartProducts.lenght === 0) {
      return res
        .status(200)
        .json({ status: "Success", message: "User Cart Is Emty", data: [] });
    }

    const lineItems = cartProducts.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productsId.title,
            description: item.productsId.description,
          },
          unit_amount: Math.round(item.productsId.price * 100),
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3001/api/users/payment/success`, //Replace with your success URL
      cancel_url: "http://localhost:3000/api/users/payment/cansel", //replace with your cancel url
    });
    //  console.log(session,"sio");

    if (!session) {
      return res.json({
        status: "Failure",
        message: "Error occured on session side",
      });
    }

    sValue = {
      userId,
      user,
      session,
    };

    res.status(200).json({
      status: "Success",
      message: "Stripe payment session created",
      url: session.url,
    });
  },

  success: async (req, res) => {
    const { id, user, session } = sValue;

    const userId = user._id;
    const cartItems = user.cart;

    const productsId = cartItems.map((item) => item.productsId);
    const orders = await Order.create({
      userId: id,
      products: productsId,
      order_id: session.id,
      payment_id: `demo ${Date.now()}`,
      total_amount: session.amount_total / 100,
    });

    if (!orders) {
      return res.json({ message: "error occured whil inputing to orderDB" });
    }

    const orderId = orders._id;
    const userUpdate = await User.updateOne(
      { _id: userId },
      {
        $push: { orders: orderId }, // Orders the pushing after successful payment
        $set: { cart: [] }, // Clearing the cart after successful payment
      },
      { new: true }
    );
    // Checking if user update was successful and sending the appropriate response
    if (userUpdate) {
      res.status(200).json({
        status: "Success",
        message: "Payment Successfuly",
      });
    } else {
      res.status(500).json({
        status: "Success",
        message: "Failed to update user data",
      });
    }
  },

  //-> Order Canseling

  Cancel: async (req, res) => {
    res.status(200).json({
      status: "succes",
      message: "Payment canceled",
    });
  },

  //-> Order Deteials
  orderDetails: async (req, res) => {
    const userId = req.params.id;
    //method is used to automatically replace the orders field in the user document with actual order documents
    const user = await User.findById(userId).populate("orders");

    // console.log(user,"lll");

    if (!user) {
      return res.status(404).json({
        status: "Failure",
        message: "User Note Found",
      });
    }
    const ordProduucts = user.orders;

    if (ordProduucts.lenght === 0) {
      return res.status(200).json({
        message: "You don't have any product orders",
        data: [],
      });
    }

    const orderWithProducts = await Order.find({
      _id: { $in: ordProduucts },
    }).populate("products");

    res.status(200).json({
      message: "Ordered Products Details Found",
      data: orderWithProducts,
    });
  },

  cancelOrder: async (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.params.userId;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { orders: orderId } },
        { new: true }
      );
      // console.log(user,"kk");

      if (!user) {
        return res.status(404).json({
          status: "Failure",
          message: "User Not Found",
        });
      }
      const order = await Order.findById(orderId);

      // console.log(order,"iii");

      if (!order) {
        return res.status(404).json({
          status: "Failure",
          message: "Order Not Found",
        });
      }

      if (order.status === "cancelled") {
        return res.status(400).json({
          status: "Failure",
          message: "Order is already cancelled",
        });
      }

      await order.save();

      await Order.deleteOne({ _id: orderId });
    } catch (error) {
      console.error("Error cancelling order:", error);
      res.status(500).json({
        status: "Failure",
        message: "Internel Server Error",
      });
    }
  },

  updateUsreProfile: (req, res) => {},
};
