import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { User } from "../models/User_model.js";

const verifyAuth = asyncHandler( async (req, _, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request !!")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Not a valid token")
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, "Not a valid Token")
    }
})

export {verifyAuth}