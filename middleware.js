const Listing=require("./models/listing.js");
const Review=require("./models/reviews.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./listingSchema.js");

module.exports. validatelisting=(req,res,next)=>{
    const {error}= listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
     throw new ExpressError(errMsg,400);
    }else{
     next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    const{error} =reviewSchema.validate(req.body);
    // console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
}
module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be log in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();

}

module.exports.isOwner=async(req,res,next)=>{
     let {id}=req.params
      let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You have no access to make changes..");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
     let {id,reviewId}=req.params
      let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not author of this review...");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
