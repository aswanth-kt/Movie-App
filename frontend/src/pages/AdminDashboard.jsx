import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard({movieCount = 0}) {
    const [tmdb_url, setTmdb_url] = useState("");

    const handleFetchMovie_TMDB = async () => {

        try {
            const response = await axios.post("/admin/fetchMovies", {
                tmdb_url
            });

            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message)
            }
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Server error!");
            console.error(error.message)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary rounded-xl p-6 shadow">
                    <p className="text-muted text-sm">Total Movies</p>
                    <h2 className="text-4xl font-bold mt-2 text-accent">{movieCount}</h2>
                </div>

                {/* <div className="bg-secondary rounded-xl p-6 shadow
                    flex flex-row md:flex-row gap-4"
                >
                    <input 
                        type="text"
                        name="tmdb_url"
                        placeholder="Enter TMDB endpoint"
                        value={ tmdb_url }
                        onChange={ (e) => setTmdb_url(e.target.value) }
                        required
                        className="px-2 py-4 rounded-xl text-black flex-1"
                    />
                    <button 
                        onClick={handleFetchMovie_TMDB}
                        type="submit"
                        className="flex-1 text-center bg-danger text-primary px-2 py-4 
                        rounded-xl font-semibold hover:opacity-90 transition"
                    >
                        Fetch Movie From TMDB
                    </button>
                    <p>⚠️ TMDB Integration Notice
                        Movies are added using TMDB API endpoints (e.g. /discover/movie).
                        Copy a valid endpoint from the TMDB website and paste it here to import movies automatically.
                        <br />
                        <span>
                            TMDB Website: https://developer.themoviedb.org/reference/movie-now-playing-list
                        </span>
                    </p>
                </div> */}

                <div className="bg-secondary rounded-xl p-6 shadow space-y-4">

                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                        type="text"
                        name="tmdb_url"
                        placeholder="Enter TMDB endpoint (e.g. /movie/now_playing)"
                        value={tmdb_url}
                        onChange={(e) => setTmdb_url(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 rounded-xl bg-primary text-gray-200
                            placeholder-muted outline-none
                            focus:ring-2 focus:ring-accent"
                        />

                        <button
                        onClick={handleFetchMovie_TMDB}
                        type="button"
                        className="md:w-64 bg-danger text-white px-6 py-3
                            rounded-xl font-semibold
                            hover:opacity-90 transition"
                        >
                        Fetch from TMDB
                        </button>
                    </div>

                    <div className="bg-primary/60 border border-primary rounded-xl p-4 text-sm text-muted">
                        <p className="font-semibold mb-1 text-gray-200">
                        ⚠️ TMDB Integration Notice
                        </p>

                        <p>
                        Movies are imported using official TMDB API endpoints.
                        Paste a valid endpoint (example: <code className="text-accent">/movie/now_playing</code>)
                        to fetch movies automatically.
                        </p>

                        <a
                        href="https://developer.themoviedb.org/reference/movie-now-playing-list"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 text-accent hover:underline"
                        >
                        TMDB API Documentation →
                        </a>
                    </div>

                </div>



            </div>

            <div className="bg-secondary rounded-xl p-6 flex flex-col md:flex-row gap-4">
                <Link
                    to="/admin/add-movie"
                    className="flex-1 text-center bg-accent text-primary
                    py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                    ➕ Add Movie
                </Link>

                <Link
                    to="/admin/manage-movies"
                    className="flex-1 text-center border border-accent
                    text-accent py-4 rounded-xl font-semibold
                    hover:bg-accent hover:text-primary transition"
                >
                    ✏️ Manage Movies
                </Link>
            </div>
        </div>
    );
}
