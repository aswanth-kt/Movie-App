import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/axios";

export default function AddMovie() {
    const [tmdb_id, setTmdbId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState();
    const [releaseDate, setReleaseDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();
    
    const handleAddMovie = async (e) => {
        e.preventDefault();

        try {
            const responce = await axios.post("/admin/movies",{
                tmdb_id, title, description, rating, releaseDate, imageUrl
            });
            // console.log("Responce of add movie:", responce);

            if (responce.status === 201 && responce.data.success) {
                toast.success(responce.data.message);
                navigate("/admin/dashboard")
            } 

            if(responce.status === 400) {
                toast.warning(responce.data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Server error!");
            console.error("Error in Add movie:", error)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col  justify-center p-20 max-auto">
            <h1 className="text-3xl font-bold mb-8">
                Add Movie
            </h1>

            <form
                onSubmit={handleAddMovie}
                className="bg-secondary rounded-xl p-6 shadow"
            >
                {/* TMDB id */}
                <div className="mb-3">
                    <label className="block text-sm mb-1">
                        TMDB ID
                    </label>
                    <input 
                        type="text" 
                        name="tmdb_id"
                        value={tmdb_id}
                        onChange={(e) => setTmdbId(e.target.value)}
                        placeholder="e.g. 4555"
                        className="w-full p-3 rounded bg-primary outline-none"
                        required
                    />
                </div>

                {/* Title */}
                <div className="mb-3">
                    <label className="block text-sm mb-1">
                        Title
                    </label>
                    <input 
                        type="text" 
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Movie title"
                        className="w-full p-3 rounded bg-primary outline-none"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="block text-sm mb-1">
                        Desription
                    </label>
                    <input 
                        type="text" 
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Movie description"
                        className="w-full p-3 rounded bg-primary outline-none"
                        required
                    />
                </div>

                {/* Rating and Release date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                    <label className="block text-sm mb-1">
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        placeholder="0 - 10"
                        min="0"
                        max="10"
                        step="0.1"
                        className="w-full p-3 rounded bg-primary outline-none"
                        required
                    />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Release Date
                        </label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            className="w-full p-3 rounded bg-primary outline-none date-white"
                            required
                        />
                    </div>
                </div>

                {/* Img url */}
                <div className="mb-5">
                    <label className="block text-sm mb-1">
                        Image URL
                    </label>
                    <input 
                        type="text" 
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Movie image URL"
                        className="w-full p-3 rounded bg-primary outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-accent text-primary py-4 rounded-xl
                    font-semibold text-lg hover:opacity-90 transition"
                >
                Add Movie
                </button>
            </form>
        </div>
    )
}