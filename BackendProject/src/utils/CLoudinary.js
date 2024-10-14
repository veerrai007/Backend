import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import 'dotenv/config';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (LocalFilePath) => {
    try {

        if (!LocalFilePath) {
            console.error("enter a valid path");
            return null;
        }

        //upload the file to cloudinary
        const response = await cloudinary.uploader.upload(LocalFilePath,
            {
                resource_type: "auto"
            }
        )
        console.log("File uploaded on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(LocalFilePath);
        //remove the locally saved file if opload uperation got failed
        return null;
    }
}



export { uploadToCloudinary };
