import axios from "axios";
import "dotenv/config";
import { tmdbBaseURL } from "../constants/constants.js";

const instance = axios.create({
    baseURL: tmdbBaseURL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
});


export default instance;