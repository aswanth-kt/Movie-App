import bcrypt from "bcrypt";
import mongoose from "mongoose";

import User from "../../models/userSchema.js"
import Movie from "../../models/movieSchema.js";
import generateJWT from "../../config/generateJWT.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name, !email, !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields!" 
            })
        }

        const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passPattern.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Min. 6 chars with uppercase, lowercase, number & special character"
            })
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check user is already exist
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return res.status(400).json({
                success: false,
                message: `You already have an account, ${existsUser.name}`
            });
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })

        if (!newUser) {    
            return res.status(404).json({
                success: false,
                message: "Faild to create the user!"
            });       
        }

        return res.status(201).json({
            success: true,
            message: "Account created",
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateJWT(newUser._id, newUser.role)
        })

    } catch (error) {
        console.error("Error in register:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};



export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email, !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields!"
            });
        };

        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        } 

        return res.status(200).json({
            success: true,
            message: "Login successfull",
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateJWT(user._id, user.role)
        });     
        
        
    } catch (error) {
        console.error("Error in login:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};


// Fetch all movies.
export const displayMovies = async (req, res) => {
    try {
        const movieCount = await Movie.estimatedDocumentCount();
        if (movieCount <= 0) {
            return res.status(400).json({
                success: false,
                message: "DB is empty!"
            })
        }
        const movies = await Movie.find();
        return res.status(200).json({
            success: true,
            message: "successfully fetched your movies!",
            movies
        })
        
    } catch (error) {
        console.error("Error in display movies:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const filter = async (req, res) => {
    try {
        const { search, sortBy } = req.query;

        // Search query
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        };
        // console.log("query:", query)

        // Sort logic
        let sortOptions = {};
        if (sortBy === "rating") sortOptions.rating = -1;   // desenting order
        if (sortBy === "title") sortOptions.title = 1;  // A to Z
        if (sortBy === "releaseDate") sortOptions.releaseDate = -1;
        // console.log("sortOptions:", sortOptions);

        // Pagination
        const page = req.query.page || 1;
        if (page < 1) page = 1;

        const limit = 8;
        const skip = (page - 1) * limit;

        const movieCount = await Movie.countDocuments(query);
        // console.log("movie count: ", movieCount)

        const movies = await Movie.find(query).sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

        if (!movies) {
            return res.status(400).json({
                success: false,
                message: "Something error",
            })
        }

        // console.log("Current Page:", page, "Limit:", limit, "TotalPage:", Math.ceil(movieCount/limit));

        return res.status(200).json({
            success: true,
            message: "Filter success",
            movies,
            currentPage: page,
            totalPage: Math.ceil(movieCount / limit),
            movieCount
        })
        
    } catch (error) {
        console.error("Error in filter:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};



// Fetch one movie details
export const fetchMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid movie ID!"
            })
        };

        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found!"
            })
        };

        return res.status(200).json({
            success: true,
            message: "Movie fetched.",
            movie
        })
        
    } catch (error) {
        console.error("Error in fetch movie:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}