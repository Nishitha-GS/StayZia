const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const UserController=require("../controllers/user.js");

router.route("/signup")
//form for signup
.get(UserController.renderSignupForm)
//store into database
.post(wrapAsync(UserController.signup));


router.route("/login")
//form for login
.get(UserController.renderLoginForm)
//login authentication
.post(saveRedirectUrl,passport.authenticate("local",{failureFlash: true, failureRedirect:'/login'}),wrapAsync(UserController.login));

//logout route
router.get("/logout",UserController.logout)

module.exports=router