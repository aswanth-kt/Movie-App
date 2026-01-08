import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
    tmdb_id: {
        type: Number,
        unique: true,
        required: true
    },
    title: String,
    description: String,
    rating: Number,
    releaseDate: Date,
    duration: Number,
    imageUrl: String,
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);