
const express=require("express");
const {registerTeamRC}=require("../controllers/teamControllerRC");
const {registerTeamNCC} = require("../controllers/teamControllerNCC");
const {registerTeamDatawiz}=require("../controllers/teamControllerDatawiz");
const {isAuthenticatedUser}=require("../middleware/auth");
const {registerIndiRC,registerIndiDatawiz,registerIndiNCC}=require("../controllers/individualController");
const {registerUser,loginUser,logoutUser,forgetPassword,resetPassword}=require("../controllers/Controllers");
const router=express.Router();

//register user:@desc:public
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
//register teams @desc:private
router.route("/register/team/RC").post(isAuthenticatedUser,registerTeamRC);
router.route("/register/team/NCC").post(isAuthenticatedUser,registerTeamNCC);
router.route("/register/team/Datawiz").post(isAuthenticatedUser,registerTeamDatawiz);
router.route("/register/indi/RC").post(isAuthenticatedUser,registerIndiRC);
router.route("/register/indi/NCC").post(isAuthenticatedUser,registerIndiNCC);
router.route("/register/indi/Datawiz").post(isAuthenticatedUser,registerIndiDatawiz);





module.exports=router;
