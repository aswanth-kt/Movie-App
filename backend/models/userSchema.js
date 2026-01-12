import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema);