import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: String,
    description: String,
    rating: Number,
    releaseDate: Date,
    duration: Number,
    imageUrl: String,
});

export default mongoose.model("Movie", movieSchema);