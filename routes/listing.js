const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedin,isOwner,validatelisting}=require("../middleware.js");
const ListingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
//Index route
.get(wrapAsync(ListingController.index))
//create datebase route
.post(isLoggedin,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(ListingController.createListing)
);

//search route
router.get("/search",async(req,res)=>{
    const {q}=req.query;
    console.log(q);
    if(!q || q.trim() === ''){
        res.redirect("/listings")
    }else{
        const regex=new RegExp(q,'i'); //case sensitive search
        const allListings=await Listing.find({ $or:[
            {title:regex},
            {location:regex},
            {category :regex}
        ]})
        res.render("listings/search.ejs",{allListings, q});

    }
    
})


//create page route
router.get("/new",isLoggedin,wrapAsync(ListingController.renderNewForm));


router.route("/:id")
//show route
.get(wrapAsync(ListingController.showListing))
//update
.put(isLoggedin,isOwner,upload.single("listing[image]"),validatelisting,wrapAsync(ListingController.updateListing))
//delete route
.delete(isLoggedin,isOwner,wrapAsync(ListingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(ListingController.renderEditForm));



module.exports=router;