const asyncHandler=require("express-async-handler");
const ErrorHandler=require("../utils/errorHandler");
const sendToken=require("../utils/sendJWTtoken");
const User = require('../models/userModel');


//registe
const registerUser=asyncHandler(async(req, res,next) => {
    const {email,first_name,last_name,password,Username,isJunior,reg_id}=req.body;

    if(!email||!first_name||!last_name||!password||!Username||!isJunior||!reg_id){
        return next(new ErrorHandler("All fields are manditory",400));
    }

    const user=await User.create({
        email,first_name,last_name,password,Username,isJunior,reg_id
    });

    sendToken(user,201,res);
});


//login
const loginUser=asyncHandler(async(req,res,next)=>{

    const {Username,password}=req.body;
    if(!Username||!password){
        return next(new ErrorHandler("All fields are manditory",400));
    }
    const user =await User.findOne ({   Username     }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Username or Password",400));
    }

    const pass_match = await user.compare(password);

    if(!pass_match){
        return next(new ErrorHandler("Invalid Username or Password",400));
    }
    
    sendToken(user,201,res);
});





module.exports={registerUser , loginUser}

