import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"


const app = express();
const port = process.env.PORT

// Connect to the DB
connectDB();

// Parsing json data
app.use(express.json());

// Parsing form data
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);


app.listen(port, (err) => {
    if (err) console.error("Server error:", err)
    else console.log(`localhost: http://localhost:${port}/user`)
})