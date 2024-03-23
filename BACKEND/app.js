require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const userRouter = require("./router/userRouter");
const ErrorHandler = require("./middlewares/ErrorHandler");
const bodyParser = require("body-parser");
const adminRoute = require("./router/adminRouter");
const cors = require("cors");
const sessiosn = require("express-session");
const passport = require("passport");
const OAuth25Strategy = require("passport-google-oauth2").Strategy;
const userDatabase = require("./models/UserSchema");

const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

//data base connection
mongoose.connect("mongodb://127.0.0.1:27017/E-Commerse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));   

app.use("/api/users", userRouter);
app.use("/api/admin", adminRoute);
app.use(ErrorHandler);


// setup session
app.use(
  sessiosn({
    secret: "DRdl0jHzblZYrEZXYNGvhoOL4xOdLTtI",
    resave: false,
    saveUninitialized: true,
  })
);

//setup passport

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth25Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
     
      try {
        let user = await userDatabase.findOne({ googleId: profile.id });

        if (!user) {
          user = new userDatabase({
            googleId: profile.id,
            username: profile.username,
            displayName:profile.displayName,   
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// intial google oAuth Login
app.get(
  "/auth/google",        
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/",
    failureRedirect: "http://localhost:3001/Login",
  }));

  app.get('/Login/sucess',async(req,res)=>{
 
       
    if(req.user){
      
      res.status(200).json({message:"user Login",user:req.user})
    }else{
      res.status(400).json({message:"Not Authorized"})     
    }
  })          
                            
  
app.listen(PORT, () => {
  console.log("Server is Runing port on 3000");
});
