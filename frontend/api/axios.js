import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
});

instance.interceptors.request.use((config) => {

    const token = localStorage.getItem("jwt_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));


instance.interceptors.response.use(

    (responce) => responce,

    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            toast.warning("Access denied!")
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
)


export default instance;