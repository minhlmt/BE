import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:['admin','user','chief'],
        default:'user'
    },
    ownerRecipes: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "recipes"
            },
        ],
        default: []
    },
    favoriteRecipes: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "recipes"
            },
        ],
        default: []
    },
    followings: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            },
        ],
        default: []
    },
    followers:{
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            },
        ],
        default: []
    },
    status: {
        type: String,
        enum: [
            "locked",
            "pending",
            "opened"
        ],
        default: "pending"
    },
    tags: {
        type: [{
            k:String,
            v:String
        }],
        default: []
    }
}, {
    timestamps: true,
})
export default mongoose.model("users", userModel);