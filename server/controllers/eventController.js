 const Events=require('../models/eventModel');
 const asyncHandler=require("express-async-handler");

 const getAllEvents=asyncHandler(async(req,res)=>{
        const events=await Events.find({});
        res.json({
            success:true, 
            events,
        });
 });

 module.exports={getAllEvents};