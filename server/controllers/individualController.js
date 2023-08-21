const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel');
const TeamRC = require("../models/teamModels");
const TeamDwiz = require("../models/teamModelsDatawiz");
const TeamNCC = require("../models/teamModelsNCC");
const sendEmail = require('../utils/sendEmail');
const {generateUsername,generatePassword}=require('../utils/automateCredentials');
const jwt=require("jsonwebtoken");

//Register for RC

const registerIndiRC=asyncHandler(async(req,res,next)=>{

    // let newTeam;
  
    // const {email1}=req.body;
    
    // const user1=await User.findOne({email:email1});
    
    // check if the users are registered 

    const {token} = req.cookies ; 
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id ; 
    const user1 = await User.findOne({_id:userId})
    const email1 = user1.email ; 

    
    if(user1==null){
        return next(new ErrorHandler("user is not registered",404));
    }

    
    // check if the individual user is registered in event 
    
    const team_user1= await TeamRC.findOne({email1:email1});
    
    //generate username & password
     const username1 = user1.Username;
    // const username1= generateUsername();
    const password1= generatePassword();
    
    // if user not register for no events 
    if(team_user1==null){
         newTeam= await TeamRC.create({
            email1,
            isRC:true,
            username1:username1,
            password1:password1,
        });
        user1.isRC=true;
        await user1.save();
    }

    
    else{
        return next(new ErrorHandler("Team or user already exists for this event!"));
    }

    //SENDING MAIL TO USER!!!!!!
       
    const message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in RC\n\n
    Your login credentials for RC are :\n username : ${username1} \n password : ${password1}\n
    In case of any technical difficulties or questions contact : \n 1) Harsh Khandelwal : +91 9529993590\n 2) Aayush Mohod : +91 8329465811`;

    try{
        await sendEmail({email:email1, subject:`Credentials for RC` , message, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${email1}`,
        newTeam
    })

});




/*******Other events:EVENT NCC********/


//register for NCC

const registerIndiNCC=asyncHandler(async(req,res,next)=>{

    // let newTeam;
  
    // const {email1}=req.body;
    
    // const user1=await User.findOne({email:email1});
    
    // check if the users are registered 
    const {token} = req.cookies ; 
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id ; 
    const user1 = await User.findOne({_id:userId})
    const email1 = user1.email ; 
    
    
    if(user1==null){
        return next(new ErrorHandler("user is not registered",404));
    }

    
    // check if the individual user is registered in event 
    
    const team_user1= await TeamNCC.findOne({email1:email1});
    
    //generate username & password
     
    const username1 = user1.Username;
    const password1= generatePassword();

    // if user not register for no events 
    if(team_user1==null){

         newTeam= await TeamNCC.create({
            email1,
            isNCC:true,
            username1:username1,
            password1:password1,
        });
        user1.isNCC=true;
        await user1.save();
    }

    
    else{
        return next(new ErrorHandler("Team or user already exists for this event!"));
    }

    //SENDING MAIL TO USER!!!!!!
       
    const message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in NCC\n\n
    Your login credentials for NCC are :\n username : ${username1} \n password : ${password1}\n
    In case of any technical difficulties or questions contact : \n 1) Sarthak Phadnis : +91 9930611330 \n 2) Prasad khatake : +91 8767039196`;

    try{
        await sendEmail({email:email1, subject:`Credentials for NCC` , message, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${email1}`,
        newTeam
    })

});




/*******Other events:EVENT DATAWIZ********/



//Register for Datawiz


const registerIndiDatawiz=asyncHandler(async(req,res,next)=>{

    // let newTeam;
  
    // const {email1}=req.body;
    
    // const user1=await User.findOne({email:email1});
    
    // check if the users are registered 
    const {token} = req.cookies ; 
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id ; 
    const user1 = await User.findOne({_id:userId})
    const email1 = user1.email ; 
    
    if(user1==null){
        return next(new ErrorHandler("user is not registered",404));
    }

    
    // check if the individual user is registered in event 
    
    const team_user1= await TeamDwiz.findOne({email1:email1});
    
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
        
        user1.isDatawiz=true;
        await user1.save();
    }

    
    else{
        return next(new ErrorHandler("Team or user already exists for this event!"));
    }

    //SENDING MAIL TO USER!!!!!!
       
    const message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in Datawiz\n\n
    In case of any technical difficulties or questions contact : \n 1) Mangesh Salunke : +91 9001589696 \n 2) Prem Gaikwad : +919823392274`;

    try{
        await sendEmail({email:email1, subject:`Credentials for Datawiz` , message, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${email1}`,
        newTeam
    });

});

const verifyRC=asyncHandler(async(req,res,next)=>{
    
    const {username} =req.params;
    const team=await TeamRC.findOne({username1:username});
    if(team==null){
        return next(new ErrorHandler('User not registred for the event',401));
    }
    const team_username=team.username1;

    const team_password=team.password1;
    res.status(200).json({
        success:true,
        message:`${team.username1} Found`,
        team_username,
        team_password
    });

    


});


const verifyNCC=asyncHandler(async(req,res,next)=>{
    
    const {username} =req.params.username;
    const team=await TeamNCC.findOne({username});
    if(team==null){
        return next(new ErrorHandler('User not registred for the event',401));
    }
    const team_username=team.username1;

    const team_password=team.password1;
    res.status(200).json({
        success:true,
        message:`${team.username1} Found`,
        team_username,
        team_password
    });

    


});

module.exports={registerIndiRC,registerIndiDatawiz,registerIndiNCC,verifyRC,verifyNCC};
