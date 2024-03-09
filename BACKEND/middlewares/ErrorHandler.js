const ErroHandler = (err, req, res, next) => {
    console.log("middleware Error Handling");
    const errStatus = req.statusCode || 500
    const errMsg = err.message || "Somthing went wrong 🚫" 
    res.status(errStatus).json({
        succes:false,
        status:errStatus,
        message:errMsg,
        stack:process.env.NODE_ENV === "development" ? err.stack : {},
    })

   // handling Mongoose duplicate key errors

   if(err.code === 11000){
     const message = `Duplicate${object.keys(err.keyValue)} entered`
     error = new ErroHandler(message,400)
   }
   // handling  wrong JWT Erros

   if(err.name === 'JsonWebTokenError'){
     const message = 'Json Web Token is inValid. Try Again'
     error = new ErroHandler(message,400)
   }

}
module.exports = ErroHandler