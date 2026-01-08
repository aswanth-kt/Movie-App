import bcrypt from "bcrypt";

import User from "../../models/userSchema.js"
import Movie from "../../models/movieSchema.js";
import generateJWT from "../../config/generateJWT.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name, !email, !password, !role) {
            return res.status(400).json({
                message: "Please fill all the fields!" 
            })
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check user is already exist
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return res.status(400).json({
                message: `You already have an account, ${existsUser.name}`
            });
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })

        if (newUser) {           
            return res.status(201).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                role: newUser.role,
                token: generateJWT(newUser._id, newUser.role)
            })
        } else {
            res.status(404).send("Internal server error");
            throw new Error("Faild to create the user!")
        }

    } catch (error) {
        console.log("Error in register:", error);
        return res.status(500).send("Server error");
    }
};



export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email, !password) {
            return res.status(400).json({
                message: "Please fill all the fields!"
            });
        };

        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "Invalid credencials"
            })
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credencials"
            })
        } else {
            return res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                token: generateJWT(user._id, user.role)
            })        
        }
        
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send("Internal server error");
    }
};


