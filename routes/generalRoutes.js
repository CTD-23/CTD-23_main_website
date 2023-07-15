const express=require("express");
const router=express.Router();
const {getAllEvents} = require('../controllers/eventController');

router.route('/events').get(getAllEvents);

router.route('/about-us').get((req,res)=>{
    res.json({message:"about us"});
});

router.route('/home').get((req,res)=>{
    res.json({message:"landing page"});
});


module.exports=router;

