import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();
const port = process.env.PORT

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

// handle preflight
app.options("/", cors());

// Connect to the DB
connectDB();

// Parsing json data
app.use(express.json());

// Parsing form data
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/admin", adminRoutes)


app.listen(port, (err) => {
    if (err) console.error("Server error:", err)
    else console.log(`localhost: http://localhost:${port}`)
})