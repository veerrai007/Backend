import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import 'dotenv/config';
import connectDB from "./db/index.js";
import {app} from "./app.js"

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("MongoDb Connection failed :",error);
})




//First Approach.............

// import express from "express";
// const app = express();

// ;( async ()=>{

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)  
//         console.log("Connected to Database");
//         app.on("error",(error)=>{
//             console.log("Error:" ,error);
//             throw error;
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT} `);
//         })
//     } catch (error) {  
//         console.error("error:", error)
//     }

// })()

