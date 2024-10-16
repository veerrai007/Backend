import {asyncHandler} from '../utils/AsyncHandler.js';
import { User } from '../models/User_model.js';
import bcrypt from "bcrypt";
import {uploadToCloudinary} from '../utils/CLoudinary.js'

const registerUser = asyncHandler(async(req,res)=>{
    
    const {username,email,fullname,password} = req.body;

    if (
        [username,email,fullname,password].some((any)=>{any?.trim()===""})
    ) {
        res.status(400).send("All fields are require")
    }
    
    const userExist = await User.findOne({email});
    
    if (userExist) {
        res.status(400).send("User with this email already exist") 
    }
    
    // const hashPassword = await bcrypt.hashSync(password, 10);
    
    const avatarLocalPath = req.file.path;
    console.log(avatarLocalPath);
    
    
    if (!avatarLocalPath) {
        res.status(400).send("Avatar is required");
    }
    
    const avatarUpload = await uploadToCloudinary(avatarLocalPath);
    
    if (!avatarLocalPath) {
        res.status(400).send("Avatar is require");   
    }
    
    const user = await User.create({
        username,
        email,
        fullname,
        password,
        avatar : avatarUpload.url
    })
    
    const userCreated = await User.findById(user._id).select("-password")
    
    if (!userCreated) {
        res.status(500).send("Something went wrong please try again");    
    }

    res.status(200).json({userCreated,"Done":"user created"})

})

export default registerUser;