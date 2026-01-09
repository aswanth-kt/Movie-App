import "dotenv/config";
import mongoose from "mongoose";

import axios from "../../config/axios.js"
import Movie from "../../models/movieSchema.js";
import { tmdbBaseURL } from "../../constants/constants.js";

export const fetchAllMoviesAndSaveToDB = async (req, res) => {
    try {
        const moviesCount = await Movie.estimatedDocumentCount();
        if (moviesCount > 0) {
            return res.status(400).json({
                success: false,
                message: `${moviesCount} movies are already in DB.`
            })
        };
        // console.log("moviesCount:", moviesCount);

        const responce = await axios.get(`${tmdbBaseURL}/trending/movie/day?language=en-US`);
        const moviesResult = responce.data
        // console.log("Movies result:", moviesResult)
        
        if (!moviesResult) {
            return res.status(404).json({
                success: false,
                message: "Cant fetch movies result from TMDB",
            })
        } else {
            moviesResult.results.map((obj) => {
                Movie.create({ 
                    tmdb_id: obj.id,
                    title: obj.title,
                    description: obj.overview,
                    rating: obj.vote_count,
                    releaseDate: obj.release_date,
                    imageUrl: obj.poster_path,
                })
            })
        }

        return res.status(200).json({
            success: true,
            message: "Movies updated successfully",
        })
        
    } catch (error) {
        console.error("Error delete movies:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const editMovies = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid movie ID!"
            })
        };

        const allowedFields = [
            "title",
            "description",
            "releaseDate",
            "imageUrl"
        ];

        let updates = {};
        for (let field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field]
            }
        }

        // Check the updates fields is empty.
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields to update."
            })
        }

        const movie = await Movie.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        )

        res.status(200).json({
            message: "Update successfull",
            movie
        })
        
    } catch (error) {
        console.error("Error delete movies:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const deleteMovie = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid movie ID!"
            })
        }

        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({
                success: false,
                message: `Something error at fetching movies`,
            })
        }
        
        return res.status(200).json({
            success: true,
            message: `${deletedMovie.title} deleted.`,
            deletedMovie
        })

    } catch (error) {
        console.error("Error delete movies:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const addMovie = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(404).json({
                success: false,
                message: "Fill the fields"
            })
        }
        const allowedFields = [
            "tmdb_id",
            "title",
            "description",
            "rating",
            "releaseDate",
            "imageUrl"
        ];

        let updates = {};
        for (let field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        // check the fields is empty
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields to update."
            })
        }

        // add new movie into DB.
        const movie = await Movie.insertOne(updates);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "New movie not added"
            })
        };

        return res.status(201).json({
            success: true,
            message: "Movie successfully added",
            movie
        });
        
    } catch (error) {
        console.error("Error delete movies:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}