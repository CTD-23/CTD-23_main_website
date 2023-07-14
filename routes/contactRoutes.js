
const express=require("express");
const {registerUser,loginUser,logoutUser,forgetPassword,resetPassword}=require("../controllers/Controllers");
const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);


module.exports=router;