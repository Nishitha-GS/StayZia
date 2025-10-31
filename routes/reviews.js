const express=require("express");
const router=express.Router({mergeParams : true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview, isLoggedin,isReviewAuthor}=require("../middleware.js");
const  ReviewController=require("../controllers/review.js");

//create Review
router.post("/",isLoggedin,validateReview,wrapAsync(ReviewController.createReview));

//delete reviews
router.delete("/:reviewId",isReviewAuthor,wrapAsync(ReviewController.destroyReview));

module.exports = router;