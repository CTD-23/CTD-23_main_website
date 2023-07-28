const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel');
const TeamNCC = require("../models/teamModelsNCC");
const sendEmail = require('../utils/sendEmail');
const {generateUsername,generatePassword}=require('../utils/automateCredentials');

//Register for NCC

const registerTeamNCC=asyncHandler(async(req,res,next)=>{

    let newTeam;
  
    const {email1,email2,team_name}=req.body;
    if(!email1||!email2||!team_name){
        return next(new ErrorHandler("All fields are manditory",400));
    }
    
    const user1=await User.findOne({email:req.body.email1});
    const user2=await User.findOne({email:req.body.email2});
    
    
    // check if the users are registered 
    
    if(user1==null||user2==null){
        return next(new ErrorHandler("1st or 2nd user is not registered",404));
    }

    //email1&&email2
     if(user1.email==user2.email){
        return next(new ErrorHandler("BOTH USER CAN'T HAVE SAME EMAIL",400));
    }
    
    // check if the team is build 
    
    const team_user1= await TeamNCC.findOne({email1:req.body.email1});
    const team_user2= await TeamNCC.findOne({email2:req.body.email2});

    //generate username & password
     
    const username1= generateUsername();
    const password1= generatePassword();

       
    const username2=generateUsername();
    const password2=generatePassword();

    // if user not register for no events 
    if(team_user1==null&&team_user2==null){

        
         newTeam= await TeamNCC.create({
            email1,
            email2,
            team_name,
            isNCC:true,
            username1:username1,
            username2:username2,
            password1:password1,
            password2:password2,
        });
    }

       
    
// if user register for events other than NCC !:) 

    // else if(!team_user1.isNCC&&!team_user2.isNCC){

    //     newTeam= await Team.create({
    //         email1,
    //         email2,
    //         team_name,
    //         isRC:false,
    //         isDatawiz:false,
    //         isNCC:true,
    //         username1:username1,
    //         username2:username2,
    //         password1:password1,
    //         password2:password2,
    //     });
        
    // }    

    else{
        return next(new ErrorHandler("Team already exists or one of the user registered for this event",400));
    }

    //SENDING MAIL TO USER 1!!!!!!
       
    let message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in NCC,\n\n
    Your login credentials for NCC are \nusername:${username1}\npassword:${password1}\n
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

    //SENDING MAIL TO USER 2

    message=`Greetings from PICT IEEE Student Branch\n
    Thank you for registering in NCC\n\n
    Your login credentials for NCC are \nusername:${username2}\npassword:${password2}\n
    In case of any technical difficulties or questions reach out to us through`;

    try{
        await sendEmail({email:req.body.email2, subject:`Credentials for NCC` , message, });

    }  
    catch(error){
        team_user2.username2 = undefined;
        team_user2.password2 = undefined;
 
        await team_user2.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }
    
    res.status(200).json({
        success:true,
        message:`team created successfully & mail sent to ${req.body.email1} & ${req.body.email2}`,
        newTeam
    })

});



module.exports={registerTeamNCC}