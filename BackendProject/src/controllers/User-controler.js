import { asyncHandler } from '../utils/AsyncHandler.js';
import { User } from '../models/User_model.js';
import bcrypt from "bcrypt";
import { uploadToCloudinary } from '../utils/CLoudinary.js';
import 'dotenv/config';
import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js'
import jwt from "jsonwebtoken"

const generateTokens = async (userID) => {
    try {

        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {

        throw new ApiError(500,"Unable to generate refreshToken");
    }
}

//Register User function....................................
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, fullname, password } = req.body;

    if (
        [username, email, fullname, password].some((any) => { any?.trim() === "" })
    ) {
        res.status(400).send("All fields are require")
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).send("User with this email already exist")
    }

    const hashPassword = await bcrypt.hashSync(password, 10);

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
        password: hashPassword,
        avatar: avatarUpload.url
    })

    const userCreated = await User.findById(user._id).select("-password")

    if (!userCreated) {
        res.status(500).send("Something went wrong please try again");
    }

    res.status(200).json({ userCreated, "Done": "user created" })

})
//Login User function........................................
const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username && !email) {
        res.status(400).send("Username or Email required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        res.status(400).
            json({
                "Success": "False",
                "Message": "Invalid Email"
            })
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(400).
            json({
                "Success": "False",
                "Message": "Invalid user credentials"
            })
    }

    const { refreshToken, accessToken } = await generateTokens(user._id);

    const logedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({
            "Success": "True",
            "Message": "Succesfully Login",
            "refreshToken": refreshToken,
            "accessToken": accessToken,
            "user": logedinUser

        })
})
//Logout user function......................................
const logoutUser = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: null,
                username: "veer"
            }
        },
        {
            new: true
        }
    )

    console.log(user);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))

})
//Refresh AccessToken.......................................
const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingToken) {
        throw new ApiError(401,"Unauthorized request")
    }

    const decodedToken = jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(501,"Invalid RefreshToken")  
    }

    if (incomingToken!==user?.refreshToken) {
        throw new ApiError(501,"RefreshToken is expired")
    }

    const {accessToken,refreshToken} = await generateTokens(user?._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                accessToken,refreshToken
            },
            "AccessToken Refreshed"
        )
    )
})

export { registerUser, loginUser, logoutUser, refreshAccessToken };