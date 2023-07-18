
const express=require("express");
const {registerTeamRC,registerTeamDatawiz,registerTeamNCC}=require("../controllers/teamController");
const {registerUser,loginUser,logoutUser,forgetPassword,resetPassword}=require("../controllers/Controllers");
const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/register/team/RC").post(registerTeamRC);
router.route("/register/team/NCC").post(registerTeamNCC);
router.route("/register/team/Datawiz").post(registerTeamDatawiz);



module.exports=router;
