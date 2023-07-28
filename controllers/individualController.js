const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel');
const TeamRC = require("../models/teamModels");
const TeamDwiz = require("../models/teamModelsDatawiz");
const TeamNCC = require("../models/teamModelsNCC");
const sendEmail = require('../utils/sendEmail');
const {generateUsername,generatePassword}=require('../utils/automateCredentials');

//Register for RC

const registerIndiRC=asyncHandler(async(req,res,next)=>{

    let newTeam;
  
    const {email1}=req.body;
    
    const user1=await User.findOne({email:req.body.email1});
    
    // check if the users are registered 
    
    if(user1==null){
        return next(new ErrorHandler("user is not registered",404));
    }

    
    // check if the individual user is registered in event 
    
    const team_user1= await TeamRC.findOne({email1:req.body.email1});
    
    //generate username & password
     
    const username1= generateUsername();
    const password1= generatePassword();

    // if user not register for no events 
    if(team_user1==null){

        
         newTeam= await TeamRC.create({
            email1,
            isRC:true,
            username1:username1,
            password1:password1,
        });
    }

    
    else{
        return next(new ErrorHandler("Team or user already exists for this event!"));
    }

    //SENDING MAIL TO USER!!!!!!
       
    const message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in RC\n\n
    Your login credentials for RC is username:${username1} & password:${password1}\n
    In case of any technical difficulties or questions reach out to us through`;

    try{
        await sendEmail({email:req.body.email1, subject:`Credentials for RC` , message, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${req.body.email1}`,
        newTeam
    })

});




/*******Other events:EVENT NCC********/


//register for NCC

const registerIndiNCC=asyncHandler(async(req,res,next)=>{

    let newTeam;
  
    const {email1}=req.body;
    
    const user1=await User.findOne({email:req.body.email1});
    
    // check if the users are registered 
    
    if(user1==null){
        return next(new ErrorHandler("user is not registered",404));
    }

    
    // check if the individual user is registered in event 
    
    const team_user1= await TeamNCC.findOne({email1:req.body.email1});
    
    //generate username & password
     
    const username1= generateUsername();
    const password1= generatePassword();

    // if user not register for no events 
    if(team_user1==null){

        
         newTeam= await TeamNCC.create({
            email1,
            isNCC:true,
            username1:username1,
            password1:password1,
        });
    }

    
    else{
        return next(new ErrorHandler("Team or user already exists for this event!"));
    }

    //SENDING MAIL TO USER!!!!!!
       
    const message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in NCC\n\n
    Your login credentials for NCC is username:${username1} & password:${password1}\n
    In case of any technical difficulties or questions reach out to us through`;

    try{
        await sendEmail({email:req.body.email1, subject:`Credentials for NCC` , message, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${req.body.email1}`,
        newTeam
    })

});




/*******Other events:EVENT DATAWIZ********/



//Register for Datawiz


const registerIndiDatawiz=asyncHandler(async(req,res,next)=>{

    let newTeam;
  
    const {email1}=req.body;
    
    const user1=await User.findOne({email:req.body.email1});
    
    // check if the users are registered 
    
    if(user1==null){
        return next(new ErrorHandler("user is not registered",404));
    }

    
    // check if the individual user is registered in event 
    
    const team_user1= await TeamDwiz.findOne({email1:req.body.email1});
    
    //generate username & password
     
    const username1= generateUsername();
    const password1= generatePassword();

    // if user not register for no events 
    if(team_user1==null){

        
         newTeam= await TeamDwiz.create({
            email1,
            isDatawiz:true,
            username1:username1,
            password1:password1,
        });
    }

    
    else{
        return next(new ErrorHandler("Team or user already exists for this event!"));
    }

    //SENDING MAIL TO USER!!!!!!
       
    const message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in Datawiz\n\n
    Your login credentials for Datawiz is username:${username1} & password:${password1}\n
    In case of any technical difficulties or questions reach out to us through`;

    try{
        await sendEmail({email:req.body.email1, subject:`Credentials for Datawiz` , message, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${req.body.email1}`,
        newTeam
    });

});


module.exports={registerIndiRC,registerIndiDatawiz,registerIndiNCC};
