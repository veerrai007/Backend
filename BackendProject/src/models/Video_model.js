import mongoose,{Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String,
            require: true
        },
        thumbnail:{
            type: String,
            require: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        duration:{
            type: Number,
            require: true
        },
        views:{
            type: Number,
            default: 0
        },
        isPublished:{
            type: Boolean,
            default: true
        }
    },{timestamps: true}
)

export const Video = mongoose.model("Video",videoSchema)