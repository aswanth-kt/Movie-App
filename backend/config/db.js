import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {

        mongoose.connect(uri);
        console.log("Database connected.")
        
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

export default connectDB;