import express from "express";
const router = express.Router();

import authenticateToken from "../middleware/auth.js";
import isAdmin from "../middleware/adminMiddleware.js.js";

import { register, login, filter, displayMovies } from "../controllers/user/userController.js";


router.post("/register", register);

router.post("/login", login);

router.get("/movies", displayMovies);

router.get("/movies/filter", filter)



export default router;