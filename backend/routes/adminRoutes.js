import express from "express";
import { fetchAllMovies } from "../controllers/admin/adminController.js";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../middleware/adminMiddleware.js.js";
const router = express.Router();

router.get("/fetchMovies", authenticateToken, isAdmin, fetchAllMovies);

export default router;