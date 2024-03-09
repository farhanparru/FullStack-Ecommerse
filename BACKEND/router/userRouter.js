const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const otpController = require('../controller/otpController')
const profileController = require('../controller/profileController')
//middlware
const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware")     
const verifyToken = require("../middlewares/userAuthMiddleware")


router 
//  user login   
.post("/signup",tryCatchMiddleware(userController.userSignup))    
.post("/login",tryCatchMiddleware(userController.userLogin))
.post('/verify',tryCatchMiddleware(userController.verifayiUser))

// Reset Password
.post('/sendpasswordlink',tryCatchMiddleware(userController.sendpasswordlink))
.get('/forgotpassword/:id/:token',tryCatchMiddleware(userController.forgotpassword))
.post("/:id/:token",tryCatchMiddleware(userController.changePassword))


.post('/verifyiOtp',tryCatchMiddleware(userController.verifyiOtp))


//  user profile

.get('/address',tryCatchMiddleware(profileController.getAddress))
.post('/createAdress',tryCatchMiddleware(profileController.cerateAddress))
.delete('/deleteAddress',tryCatchMiddleware(profileController.deleteAddress))




.get("/allProducts",tryCatchMiddleware(userController.allProducts))
.get("/products",tryCatchMiddleware(userController.viewProduct))
.get("/products/:id",tryCatchMiddleware(userController.productById))


.get("/products/category:categoryname",tryCatchMiddleware(userController.productsByCatogery))
.post("/:id/cart",tryCatchMiddleware(userController.addToCart))

.post("/:id/payment",tryCatchMiddleware(userController.payment))
.get("/payment/success",tryCatchMiddleware(userController.success))
.use(verifyToken) 
.get("/:id/cart",tryCatchMiddleware(userController.viewCartProduct))
.put("/:id/cart",tryCatchMiddleware(userController.updateCartItemQuantity))
.delete("/:id/cart",tryCatchMiddleware(userController.removeCartProduct))

    

.post("/:id/wishlists",tryCatchMiddleware(userController.addToWishlist))
.get("/:id/wishlists",tryCatchMiddleware(userController.showWishlist))
.delete("/:id/wishlists",tryCatchMiddleware(userController.deleteWishlist))

.post("/payment/cansel",tryCatchMiddleware(userController.Cancel))
.get("/:id/orders",tryCatchMiddleware(userController.orderDetails))
.post('/:userId/orders/:orderId/cancel',userController.cancelOrder)




module.exports = router
