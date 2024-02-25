//Schmea imported
const User = require("../models/UserSchema")
const product = require("../models/productSchema")
const Order = require('../models/orderSchema')
const { joiUserSchema } = require("../models/validationSchema")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken") //Json Web Token Security puropsse
const {default:mongoose, Error}= require("mongoose") //ES6 Module syntex default Commmon js 
const {json} = require('body-parser')
const  stripe = require("stripe")(process.env. STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer')
// console.log(process.env.STRIPE_SECRET_KEY,"hhs");
let sValue = []


   //for verifyi email



 
module.exports ={
    //->new User Register
    userSignup:async(req,res)=>{
      console.log("re",req.body)
       
        const {value,error} = joiUserSchema.validate(req.body)
        const {email,username,password,confirom}=req.body;
        if(error){
           return res.status(400).json({ 
                status:"Error",
                message:"Invalid user input ☹️. Please check your data. 🙂"
            })
        }
      const user =   await User.create({
       
            email:email,
            username:username,
            password:password,
            confirom:confirom
        })
       
        

      

        return res.status(200).json({
            status:"success",
            message:"User registration Succesfull😊"
        })
        
    },


    

  

 

    //->user Login Jwt Web Token
     userLogin: async (req,res)=>{
      console.log(req.body)
       
          // const {value,error} = joiUserSchema.validate(req.body) 
        
          // if(error){
          //     res.json(error.message)
              
          // }

        const {email,password} = req.body 
          
        const user = await User.findOne({
         
              email : email,   
          })
         
      
        
          const Email = user.email
          const user1 = user._id


          // console.log(user,"halo");
          

           if(!user){
            return res.status(404).json({
                status: "error",
                message:"User not fount 🧐"
            })
          }
          if(!password || !user.password){
              return res  
              .status(401)
              .json({error: "errore",message:"Invalid Input"})
             
          }
            const passwordCheck = await bcrypt.compare(password,user.password); 
            console.log(passwordCheck);
            if(!passwordCheck){
             
                return res
                .status(401)
                .json({error:"error",message:"Incorrect password  🔐"})
            }
                const token = jwt.sign(
                    {username:user.username},
                    process.env.USER_ACCES_TOKEN_SECRET,
                    
                {

                    expiresIn:86400
                    
                }
                );
             
                res
                .status(200)
                .json({
                  status:"succes",
                  message:"Login SuccessFull",
                   data: token,
                   Email:Email, 
                   userId:user1
                  })
           },

       //->AllProducts


       allProducts:async(req,res)=>{
         const products = await  product.find()
         if(!products){
            res.status(404).send({status:"error",message:"product note found"})
         }

         res.status(200).send({
           status:"Success",
           message:"Success fully fetched data",
           data:products,
         })
       },


 


           //->view product by category
            viewProduct:async(req,res)=>{
              const products =  await product.find()
              if(!products){
                 res.status(404).send({status:"error",message:"product note found"})
              }

            //   console.log(products);

              res.status(200).send({
                status:"succes",
                message:"Success Fully fetched data",
                data:products,
              })
           },

           //->View a specific product.
           productById: async(req,res)=>{
             const productId = req.params.id;
             const prod = await product.findById(productId)
            //  console.log(prod);
             if(!prod){
                
                return res.status(404).json({ 
                    status:"error",
                    message:"Product note Found",
                })
             }
             res.status(200).json({
                status:"product fetched successfully✅",
                data:prod,
             })
           },

           // ->product by category

           productsByCatogery:async(req,res)=>{
             const prodCatogery= req.params.categoryname;
            //  console.log(prodCatogery);
             const products = await product.find({category: prodCatogery});
             if(!products){
                return res.status(404).send({
                    status:"error",
                    message:"Product note found"
                })
             }
               res.status(200).send({
                 status:"SuccessFully",
                 message:"Product Category Fetched ✅",
                 data:products,
               })
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
        
                const isProductInCart = user.cart.some(item => item.productsId.equals(productId));
                if (isProductInCart) {
                    return res.status(400).send({
                        status: "Failure",
                        message: "Product is already in the cart",
                    });
                }
        
                await User.updateOne({ _id: userId }, { $addToSet: { cart: { productsId: productId } } });
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
                  viewCartProduct: async (req,res)=>{
                    const userId = req.params.id;
                    const user = await  User.findById(userId) 
                        // console.log(user,'useerrr');
                    if(!user){
                        return res
                        .status(404)
                         .json({status:"Failer",message:" User Note Found"})
                    }

                    const cartProductIds = user.cart

                    if(cartProductIds.length === 0){
                            return res
                            .status(200)
                            .json({status:"Succes",message:"User Cart is Emty 🛒",data:[]})
                    }

                    const cartProducts = await User.findOne({_id: userId}).populate("cart.productsId")
    res
      .status(200)
      .json({
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
                    return res.status(404).json({ message: 'User not found' }) 
                  }
                  const cartItem = user.cart.id(id)

                  console.log(cartItem,"kkkk");
                  
                  if (!cartItem) { 
                    return res.status(404).json({ message: 'Cart item not found' }) 
                  }
                  cartItem.quantity += quantityChange
                
                  if (cartItem.quantity > 0) {
                    await user.save();
                  }
                  res.status(201).json({
                    status: 'success',
                    message: 'Cart item quantity updated',
                    data: user.cart
                  });
                },
                
              
             

                removeCartProduct: async (req, res) => {
                  const userId = req.params.id;
                  const productId = req.body.productId;
              
                  try {
                      await User.updateOne({ _id: userId }, { $pull: { "cart": { "productsId": productId } } });
                      res.status(201).json({
                          status: "success",
                          message: "Product removed from the cart."
                      });
                  } catch (error) {
                      res.status(500).json({
                          status: "error",
                          message: "Failed to remove product from the cart.",
                          error: error.message
                      });
                  }
              },
              
           

             

              // removeCartProduct: async(req,res)=>{
              //    const userId = req.params.id
                
              //    const itemId =req.params.itemId 
              //    console.log(itemId,"eeee");
                 
              //    if(!itemId){
              //      return res.status(404).json({message:"Product not found"})
              //    }
              //    const user = await User.findById(userId)
              //   //  console.log(user,"ttt");

              //    if(!user){
              //      res.status(404).json({message:"User Note found"})
              //    }

              //    const result = await User.updateOne(
                  
              //      {_id:userId},
              //      {$pull:{cart:{cart:itemId}}}
              //    );
               
              //   //  console.log(result,"PP");

              //    if(result.modifiedCount > 0){
              //      console.log('item removed successfully');
              //      res.status(200).json({message:"Product removed successfully",data,result})
              //    }else{
              //      console.log('Item not found in the cart');
              //    }

              // },




                 //-> Add Product to Wish list

                 addToWishlist:async(req,res)=>{
                  //Extracting User ID from Request Parameters:
                     const userId = req.params.id;
                     if(!userId){
                         return res
                         .status(404)
                         .json({status:"Failer",message:"User Note Found"})
                     }
                     console.log(userId);
                       //Extracting Product ID from Request Body:
                     const {productId} = req.body;
                 
                     const  products = await product.findById(productId)
                   
                     if(!products){
                        return res
                        .status(404)
                         .json({message:"Product note found"})                        
                     }
                     
                     //It then checks if the user already has the specified product in their wishlist by querying the User model
                     const findproducts = await User.findOne({_id:userId,wishlist:productId})
                    //  console.log(findproducts);
                     if(findproducts){
                      return res
                      .status(409)
                      .json({message:"Product already on Your wishlist"})
                          
                     }
                   
                     
                     //If the product is not already in the wishlist, it updates the user document in the database by pushing the product ID into the wishlist array.
                     await User.updateOne({_id:userId},{$push:{wishlist:products}})
                     res.status(201).json({
                       status:"Success",
                       message:"Product SuccesFully added to wishlist",
                     })
                 },
                 // ->Show wishlist
                 showWishlist: async(req,res)=>{
                  //Extracting User ID from Request Parameters:
                      const userId = req.params.id;
                      // console.log(userId,"swjk");
                      const user = await  User.findById(userId)
                      console.log(user);
                      if(!user){
                         return res
                         .status(404)
                         .json({status:"Failer",message:"User Note found"})
                      }
                        //It then checks if the user's wishlist is empty.
                      const wishProdId = user.wishlist;
                      // console.log(wishProdId,"shjkdh");

                      if(wishProdId .length === 0){
                         return res
                         .status(200)
                         .json({status:"Success",message:"User Wishlist is Emty",data:[]})
                      }
                        //If the wishlist is not empty, it proceeds to fetch the products in the wishlist using the product IDs stored in the wishProId array.
                      const wishProducts = await product.find({_id:{$in:wishProdId}})
                      
                      
                            res
                            .status(200)
                            .json({
                              status:"Success",
                              message:"Wishlist products fetched SuccessFully",
                              date:wishProducts ,
                            })
                     
                        },

                        //-> delete wishlist products

                        deleteWishlist:async (req,res)=>{
                          //Extracting User ID and Product ID from Request:
                            const userId= req.params.id
                            const {productId} = req.body;   
                            if(!productId){
                               return res.status(404).json({message:"Product note found"})
                            }  
                            
                            const user = await User.findById(userId);
                            
                             if(!user){
                               return res
                               .status(404)
                               .json({status:"Failer",message:"User Note Found"})
                             }
                              //It proceeds to update the user document in the database, using $pull to remove the specified product ID from the wishlist array.
                             await User.updateOne({_id:userId},{$pull:{wishlist:productId}})
                             res.status(200).json({status:"Successfully removed from wishlist"})
                        },

                          //-> Payments user purchase
                      payment: async (req,res)=>{
                          const userId = req.params.id;
                        
                          const user = await User.findOne({_id: userId}).populate('cart.productsId')
                            
                               
                          if(!user){
                               return res.status(404).json({message: "User Note Found"})
                          }
                         
                              const cartProducts = user.cart;
                             
                               if(cartProducts.lenght === 0){
                                 return res
                                 .status(200)
                                 .json({status:"Success",message:"User Cart Is Emty",data:[]})
                               }      
                                 
                               const  lineItems =  cartProducts.map((item)=>{
                               
                                    return {
                                      price_data:{
                                      currency:"inr",
                                      product_data:{
                                      name: item.productsId.title,
                                      description:item.productsId.description
                                      },
                                      unit_amount:Math.round(item.productsId.price * 100)
                                      },
                                      quantity: 1,
                                    };
                                 }) ;
                               
                              
                                const  session = await stripe.checkout.sessions.create({
                           
                                    payment_method_types:['card'],
                                    line_items: lineItems,
                                    mode: "payment",
                                    success_url:`http://localhost:3001/api/users/payment/success`,//Replace with your success URL
                                    cancel_url:"http://localhost:3000/api/users/payment/cansel"//replace with your cancel url

                                 });
                                //  console.log(session,"sio");

                                 if(!session){
                                   return res.json({
                                     status:"Failure",
                                     message:"Error occured on session side",
                                   })
                                 }
                                  
                                 sValue ={
                                   userId,
                                   user,
                                   session,
                                 };
                               

                                 res.status(200).json({    
                                   status:"Success",
                                   message:"Stripe payment session created",
                                   url:session.url,
                                 })
                            } ,
                           
                            success: async (req,res)=>{
                             
                              
                                const{id,user,session} = sValue;
                                    
                               
                                const  userId = user._id;  
                                const cartItems = user.cart;

                                const productsId = cartItems.map((item)=> item.productsId)
                                const orders = await Order.create({
                                 
                                   userId: id,
                                   products:productsId, 
                                   order_id:session.id,
                                   payment_id: `demo ${Date.now()}`,
                                   total_amount:session.amount_total/100,

                  
                                });
                                

                                if(!orders){
                                    return res.json({message:"error occured whil inputing to orderDB"})
                                }
                           
                                const orderId = orders._id;
                                const userUpdate = await User.updateOne(
                                   {_id:userId},
                                   {
                                    $push:{orders:orderId}, // Orders the pushing after successful payment
                                    $set:{cart:[]},// Clearing the cart after successful payment
                                   },
                                   {new:true}
                                )
                             // Checking if user update was successful and sending the appropriate response
                                if(userUpdate){
                                   res.status(200).json({
                                     status:"Success",
                                     message:"Payment Successfuly"
                                   })
                                }else{
                                  res.status(500).json({
                                     status:"Success",
                                     message:"Failed to update user data"
                                  })
                                }
                            },

                            //-> Order Canseling


                            Cancel:async(req,res)=>{
                                 res.status(200).json({
                                   status:"succes",
                                   message:"Payment canceled"
                                 })
                            },
                             

                        //-> Order Deteials
                       orderDetails:async (req,res)=>{
                          const userId = req.params.id;
                          //method is used to automatically replace the orders field in the user document with actual order documents
                          const user = await User.findById(userId).populate('orders')
                        
                          // console.log(user,"lll");

                          if(!user){
                             return res.status(404).json({
                               status: 'Failure',
                               message:'User Note Found'
                             })
                          }
                          const ordProduucts = user.orders;

                          if(ordProduucts.lenght === 0){
                              return res.status(200).json({
                                 message: "You don't have any product orders",
                                 data:[],
                              })
                          }

                          const orderWithProducts = await Order.find({_id:{$in: ordProduucts}})
                          .populate('products')
                          
                          res.status(200).json({
                             message:"Ordered Products Details Found",
                             data:orderWithProducts,
                       })
                      }
                  } ;