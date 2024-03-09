const express = require("express")
const router = express.Router() 
const admin = require("../controller/adminController")

//Middleware
const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware")
const verifyToken = require("../middlewares/adminAuthMiddleware")
const imageUpload = require("../middlewares/imageUpload/imageUpload")
router.use(express.json())

router
.post("/login",tryCatchMiddleware(admin.login))


// apk middleware  star




// apk middleware  end


.get("/users",tryCatchMiddleware(admin.allUsers))
.get("/user/:id",tryCatchMiddleware(admin.userById))

.post('/user/block',tryCatchMiddleware(admin.userBlock))

.post("/products",imageUpload, tryCatchMiddleware(admin.creatProduct))
.get("/products",tryCatchMiddleware(admin.allProducts))

.get("/products/:id",tryCatchMiddleware(admin.productsById))
.delete("/products",tryCatchMiddleware(admin.delteProduct))

.put("/products",imageUpload,tryCatchMiddleware(admin.updateProduct))

.get("/orders",tryCatchMiddleware(admin.orderDetials))

.get("/viewOrder/:id",tryCatchMiddleware(admin.viewOder))
.use(verifyToken)
module.exports = router 

