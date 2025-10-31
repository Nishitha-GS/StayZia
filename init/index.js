const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/Stayzia";


async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{console.log("connected to db successfully")})
.catch((err)=>{console.log("Error has occured in connecting database :",err)});

const initDB=async()=>{
 await Listing.deleteMany({});
 initData.data=initData.data.map((obj)=>({...obj,owner:'69001128a709150a35452ee4'})) 
await Listing.insertMany(initData.data)
 console.log("Data work is done Successfully");
}

initDB();