import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminMovieList from "../components/AdminMovieList";
import axios from "../../api/axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";


export default function ManageMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/user/movies/filter?search=${search}&page=${currentPage}`);
                console.log("Manage movie res: ", response.data);

                if (response.status === 200 && response.data.success) {
                    setMovies(response.data.movies);
                    setTotalPage(response.data.totalPage);

                    // Avoid filter message
                    if (!response.data.message === "Filter success") {
                        toast.success(response.data.message);
                    };
                };
                setLoading(false)

            } catch (error) {
                toast.error(error.response?.data?.message || "Server error!");
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();

    }, [search, currentPage]);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">
                Manage Movies
            </h1>

            <SearchBar search={search} setSearch={setSearch} />
            
            {
                loading 
                ? <h1 className="text-center font-fold text-4xl text-accent">Loading...</h1>
                : movies.map((movie) =>
                    <AdminMovieList key={movie._id} 
                        movie={movie} 
                        loading={loading}
                        allMovies={movies} 
                        setMovies={setMovies} 
                        isEmpty={movies.length}
                    />
                )
            }

            {!loading && <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
            />}

        </div>
    )
}