import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import 'dotenv/config';

const connectDB = async ()=>{
    try {
       const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongoDB connected -> DB HOST:${response.connection.host}`);
        
    } catch (error) {
        console.error("Connection failed",error)
        process.exit(1)
        
    }
}

export default connectDB;