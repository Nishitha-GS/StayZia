const joi= require("joi")
module.exports.listingSchema=joi.object({
    listing: joi.object({
        title:joi.string().required(),
        description: joi.string().required(),
        country: joi.string().required(),
        location: joi.string().required(),
        price: joi.number().required().min(0), //price cannot be negative
        image:joi.object({
            url:joi.string().uri().required(),
            filename:joi.string().required()
        }).optional(),  //allow url and also allow if url is missing(coz we our default url)
        category:joi.string().valid("Mountains","Castles","Arctic","Camping","Farms","Rooms","Iconic cities","Swimming","Beach","Boat").required()
    }).required(),
})

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()
})