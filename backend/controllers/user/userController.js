import bcrypt from "bcrypt"

import User from "../../models/userSchema.js"
import generateJWT from "../../config/generateJWT.js";
import { json } from "express";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name, !email, !password, !role) {
            res.status(400).json({
                message: "Please fill all the fields!" 
            })
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check user is already exist
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            res.status(400).json({
                message: `You already have an account, ${existsUser.name}`
            });
            throw new Error("User already exists!")
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        })

        if (newUser) {            
            res.status(201).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                role: newUser.role,
                token: generateJWT(newUser._id, newUser.role)
            })
        } else {
            res.status(404);
            throw new Error("Faild to create the user!")
        }

    } catch (error) {
        console.log("Error at register:", error);
        res.status(500).send("Server error");
    }
};



export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email, !password) {
            res.status(400).json({
                message: "Please fill all the fields!"
            });
        };

        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            res.status(400).json({
                message: "Invalid credencials"
            })
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid credencials"
            })
        } else {
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                token: generateJWT(user._id, user.role)
            })        
        }
        
    } catch (error) {
        console.error("Error at login:", error);
        res.status(500).send("Server error");
    }
}