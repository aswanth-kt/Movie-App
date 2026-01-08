import express from "express";
import { editMovies, fetchAllMovies } from "../controllers/admin/adminController.js";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../middleware/adminMiddleware.js.js";
const router = express.Router();

router.get("/fetchMovies", authenticateToken, isAdmin, fetchAllMovies);

router.post("/movies/:id", authenticateToken, isAdmin, editMovies);


export default router;