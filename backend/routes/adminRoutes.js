import express from "express";
import { addMovie, deleteMovie, editMovies, fetchAllMoviesAndSaveToDB } from "../controllers/admin/adminController.js";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../middleware/adminMiddleware.js.js";
const router = express.Router();

router.post("/fetchMovies", authenticateToken, isAdmin, fetchAllMoviesAndSaveToDB);

router.put("/movies/:id", authenticateToken, isAdmin, editMovies);

router.delete("/movies/:id", authenticateToken, isAdmin, deleteMovie);

router.post("/movies", authenticateToken, isAdmin, addMovie);


export default router;