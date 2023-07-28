const ErrorHandler=require("../utils/errorHandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";
    
    //Wrong JWT Token
    if(err.name==="JsonWebTokenError"){
        const message=`Json Web Token is invalid,try again`;
        err=new ErrorHandler(message,400);
    }

    //JWT Expire error
    if(err.name==="TokenExpiredError"){
        const message=`Json Web Token Expired`;
        err=new ErrorHandler(message,400);
    }

    //duplicate key error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.message,
        stack:err.stack //will return stack trace
    });
};
