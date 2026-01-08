import "dotenv/config";
import axios from "axios";

import Movie from "../../models/movieSchema.js";

export const fetchAllMovies = async (req, res) => {
    try {
        const moviesCount = await Movie.estimatedDocumentCount();
        if (moviesCount >= 0) {
            return res.status(400).json({
                message: `${moviesCount} movies are already fetched.`
            })
        };
        // console.log("moviesCount:", moviesCount);

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        };

        const responce = await axios.request(options);
        const moviesResult = responce.data
        // console.log("Movies result:", moviesResult)
        
        if (!moviesResult) {
            return res.status(404).json({
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
            message: "Movies updated successfully",
        })
        
    } catch (error) {
        console.error("Error in fetching all movies:", error);
        return res.status(500).send("Internal server error");
    }
};


export const editMovies = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
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
        console.error("Error edit movies:", error);
        return res.status(500).send("Internal server error");
    }
}