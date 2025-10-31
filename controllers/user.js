const  User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("./user/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let {username,password,email}=req.body;
        let newUser= new User({email,username});
        let registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
         req.flash("success","Welcome to StayZia! ");
        res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.login=async(req,res)=>{
    console.log(req.username," logged in");
    req.flash("success","you have login successfully! Welcome back to Stayzia");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you have successfully logged out! Hope you comeback soon :)");
          res.redirect("/listings");
    })
}