
const express=require("express");
const {registerTeamRC}=require("../controllers/teamControllerRC");
const {registerTeamNCC} = require("../controllers/teamControllerNCC");
const {registerTeamDatawiz}=require("../controllers/teamControllerDatawiz");
const {registerIndiRC,registerIndiDatawiz,registerIndiNCC}=require("../controllers/individualController");
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
router.route("/register/indi/RC").post(registerIndiRC);
router.route("/register/indi/NCC").post(registerIndiNCC);
router.route("/register/indi/Datawiz").post(registerIndiDatawiz);





module.exports=router;
