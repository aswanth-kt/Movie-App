import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
});

instance.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        config.headers.Authorization = `Bearer ${user.token}`;
        // console.log("Interceptor token:", user.token);
    }

    // console.log("axios config:", config)

    return config;
}, (error) => Promise.reject(error));


instance.interceptors.response.use(
    (responce) => responce,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
)


export default instance;