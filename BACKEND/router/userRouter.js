const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
//middlware
const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware")
const verifyToken = require("../middlewares/userAuthMiddleware")


router    
.post("/signup",tryCatchMiddleware(userController.userSignup))


.post("/login",tryCatchMiddleware(userController.userLogin))
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

module.exports = router
