import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
    tmdb_id: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);