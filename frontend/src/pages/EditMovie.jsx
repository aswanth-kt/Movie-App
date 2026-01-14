import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function EditMovie() {
    
    const [movie, setMovies] = useState({ 
        title: "",
        description: "",
        releaseDate: "",
        imageUrl: "", 
    });

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/user/movies/${id}`)
        .then((res) => {
            // add movie details for show in input value
            setMovies({
                title: res.data.movie.title,
                description: res.data.movie.description,
                releaseDate: res.data.movie.releaseDate?.slice(0, 10),
                imageUrl: res.data.movie.imageUrl
            })
        }).catch((err) => console.error(err));
    }, [id])
    
    const handleChange = (e) => {
        setMovies({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.put(`/admin/movies/${id}`, {
                title: movie.title,
                description: movie.description,
                releaseDate: movie.releaseDate,
                imageUrl: movie.imageUrl
            });

            if (response.status === 200 && response.data.success) {
                toast(response.data?.message)
                navigate("/admin/manage-movies");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Server error!")
            console.error(error.message);
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                Edit Movie
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-secondary rounded-xl p-6 space-y-6 shadow"
            >
                <div>
                    <label className="block text-sm mb-1">
                        Title
                    </label>
                    <input 
                        type="text" 
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">
                        Description
                    </label>
                    <input 
                        type="text" 
                        name="description"
                        value={movie.description}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">
                        Release Date
                    </label>
                    <input 
                        type="date" 
                        name="releaseDate"
                        value={movie.releaseDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">
                        Image URL
                    </label>
                    <input 
                        type="text" 
                        name="imageUrl"
                        value={movie.imageUrl}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-primary outline-none"
                    />
                </div>

                <div className="flex gap-4 pt-4">

                    <button
                        type="submit"
                        className="flex-1 bg-accent text-primary py-4 rounded-xl font-semibold
                        hover:opacity-90 transition"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/manage-movies")}
                        className="flex-1 border border-accent text-accent py-4 rounded-xl 
                        font-semibold hover:bg-accent hover:text-primary transition"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    )
};