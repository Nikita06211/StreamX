// require('dotenv').config({path:'/env'});
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at PORT ${process.env.PORT}`);
})
.catch((err)=>{
    console.log("MongoDB connection fail",err);
})





/*
import express from "express";
const app = express()

(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("err: ",error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error(error);
    }
})()

*/