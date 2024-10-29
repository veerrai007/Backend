import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import 'dotenv/config';

const userSchema = new Schema(
    {
        username:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname:{
            type: String,
            require: true,
            trim: true,
            index: true,
        },
        avatar:{
            type: String,
            require: true,
        },
        coverImage:{
            type: String,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type: String,
            require: [true,"Password is required"],
        },
        refreshToken:{
            type: String,
        }

    },{timestamps: true}
)

userSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullname: this.fullname,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET
    )
}

userSchema.methods.generateRefreshToken = function(){

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET
    )
}

export const User = mongoose.model("User",userSchema)