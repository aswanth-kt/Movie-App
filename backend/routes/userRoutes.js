import express from "express";
const router = express.Router();

import { register, login, filter, displayMovies, fetchMovie } from "../controllers/user/userController.js";


router.post("/register", register);

router.post("/login", login);

router.get("/movies", displayMovies);

router.get("/movies/filter", filter);

// Fetch one movie details
router.get("/movies/:id", fetchMovie)


export default router;