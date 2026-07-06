const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: process.env.DB_NAME,
        });
        console.log(`db connected successfully`);
    }catch (error){
        console.log(`${error.message}`);
    }
};

module.exports = connectDB;