const express=require("express");
const {get,put,post,del}=require("../controllers/Controllers");

const router=express.Router();

router.route("/").get(get).post(post).put(put).delete(del);
   
module.exports=router;
