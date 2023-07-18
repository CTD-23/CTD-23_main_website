const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendJWTtoken");
const User = require('../models/userModel');
const crypto=require("crypto");
const sendEmail = require('../utils/sendEmail');


//register
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

//logout
const logoutUser = asyncHandler(async(req,res,next)=>{

     res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    
    res.status(200).json({
        success:true,
        message:"Logged out",
    });
    
});

//forget password
const forgetPassword = asyncHandler(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
         
    if(!user){
        return next(new ErrorHandler("User not found ",404));
    }

    const resetToken = user.getResetToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl =`${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;

    const message=`your reset password token is \n\n ${resetPasswordUrl} \n\n if not requested ignore `;

    
    try{
        await sendEmail({email:user.email , subject:`CTD PASSWORD RECOVERY` , message , });
        res.status(200).json({
            success:true,

            message:`Email sent to ${user.email}`,
        });
    }  
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
 
        await user.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }
    

});



// //reset password
const resetPassword=asyncHandler(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken=crypto
     .createHash("sha256")
     .update(req.params.token)
     .digest("hex");

     const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
     });

     if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",404));
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password and confirm Password dont match",404));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);

});


module.exports={registerUser , loginUser,logoutUser,forgetPassword,resetPassword}




//"password" : "Giyaan@66",