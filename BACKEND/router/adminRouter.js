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


// apk middleware  start



// apk middleware  end


.get("/users",tryCatchMiddleware(admin.allUsers))
.get("/user/:id",tryCatchMiddleware(admin.useById))

.post("/products",imageUpload, tryCatchMiddleware(admin.creatProduct))
.get("/products",tryCatchMiddleware(admin.allProducts))

.get("/products/:id",tryCatchMiddleware(admin.productsById))
.delete("/products",tryCatchMiddleware(admin.delteProduct))
.use(verifyToken)
.put("/products",tryCatchMiddleware(admin.updateProduct))
.get("/orders",tryCatchMiddleware(admin.orderDetials))


module.exports = router 