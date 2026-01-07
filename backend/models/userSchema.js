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
        enum: ["user", "admin"]
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema);