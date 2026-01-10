import bcrypt from "bcrypt";

import User from "../../models/userSchema.js"
import Movie from "../../models/movieSchema.js";
import generateJWT from "../../config/generateJWT.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name, !email, !password, !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields!" 
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
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role,
            token: generateJWT(newUser._id, newUser.role)
        })

    } catch (error) {
        console.log("Error in register:", error.message);
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
                message: "Invalid credencials"
            })
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credencials"
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
            message: "Movies displayed",
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
        const {search, sortBy} = req.query;

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
        console.log("sortOptions:", sortOptions)

        const movies = await Movie.find(query).sort(sortOptions);

        if (!movies) {
            return res.status(400).json({
                success: false,
                message: "Something error",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Filter success",
            movies
        })
        
    } catch (error) {
        console.error("Error in filter:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};


