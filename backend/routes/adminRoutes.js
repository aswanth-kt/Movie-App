import express from "express";
import { addMovie, deleteCollection, deleteMovie, editMovies, fetchAllMoviesAndSaveToDB, totalMovieCount } from "../controllers/admin/adminController.js";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../middleware/adminMiddleware.js.js";
const router = express.Router();

router.post("/fetchMovies", authenticateToken, isAdmin, fetchAllMoviesAndSaveToDB);

router.put("/movies/:id", authenticateToken, isAdmin, editMovies);

router.delete("/movies/:id", authenticateToken, isAdmin, deleteMovie);

router.post("/movies", authenticateToken, isAdmin, addMovie);

router.get("/movies/movie-count", authenticateToken, isAdmin, totalMovieCount);

router.delete("/delete-movies", authenticateToken, isAdmin, deleteCollection);


export default router;