const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel');
const TeamRC = require("../models/teamModels");
const sendEmail = require('../utils/sendEmail');
const {generateUsername,generatePassword}=require('../utils/automateCredentials');

//Register for RC

const registerTeamRC=asyncHandler(async(req,res,next)=>{

    let newTeam;
  
    const {email1,email2,team_name}=req.body;
    
    const user1=await User.findOne({email:req.body.email1});
    const user2=await User.findOne({email:req.body.email2});
    
    
    // check if the users are registered 
    
    if(user1==null||user2==null){
        return next(new ErrorHandler("1st or 2nd user is not registered",404));
    }

    //email1&&email2
     if(user1.email==user2.email){
        return next(new ErrorHandler("BOTH USER CAN'T HAVE SAME EMAIL"));
    }
    
    // check if the team is build 
    
    const team_user1= await TeamRC.findOne({email1:req.body.email1});
    const team_user2= await TeamRC.findOne({email2:req.body.email2});

    //generate username & password
     
    const username1= generateUsername();
    const password1= generatePassword();

       
    const username2=generateUsername();
    const password2=generatePassword();

    // if user not register for no events 
    if(team_user1==null||team_user2==null){

        
         newTeam= await TeamRC.create({
            email1,
            email2,
            team_name,
            isRC:true,
            username1:username1,
            username2:username2,
            password1:password1,
            password2:password2,
        });
    }

       
    
// if user register for events other than RC !:) 

    //  else if(!team_user1.isRC&&!team_user2.isRC){

    //     newTeam= await Team.create({
    //         email1,
    //         email2,
    //         team_name,
    //         isRC:true,
    //         isDatawiz:false,
    //         isNCC:false,
    //         username1:username1,
    //         username2:username2,
    //         password1:password1,
    //         password2:password2,
    //     });
        
    // }    
    
    else{
        return next(new ErrorHandler("Team already exists for this event!"));
    }

    //SENDING MAIL TO USER 1!!!!!!
       
    const message1=`ur login credentials are username:${username1} & password:${password1}`;

    try{
        await sendEmail({email:req.body.email1, subject:`Credentials for RC` , message1, });
    }  
    catch(error){
        team_user1.username1 = undefined;
        team_user1.password1 = undefined;
 
        await team_user1.save({validateBeforeSave:false});
    
        return next(new ErrorHandler(error.message,500));       
    }

    //SENDING MAIL TO USER 2

    const message2=`ur login credentials are username:${username2} & password:${password2}`;

    try{
        await sendEmail({email:req.body.email2, subject:`Credentials for RC` , message2, });

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

module.exports={registerTeamRC}
