import express from "express";
import { fetchAllMovies } from "../controllers/admin/adminController.js";
const router = express.Router();

router.get("/fetchMovies", fetchAllMovies)

export default router;