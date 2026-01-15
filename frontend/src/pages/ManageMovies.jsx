import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminMovieList from "../components/AdminMovieList";
import axios from "../../api/axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";


export default function ManageMovies() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {

        const fetchMovies = async () => {
            try {
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

            } catch (error) {
                toast.error(error.response?.data?.message || "Server error!");
                console.error(error.message);
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
                movies.map((movie) => 
                    <AdminMovieList key={movie._id} 
                        movie={movie} 
                        allMovies={movies} 
                        setMovies={setMovies} 
                        isEmpty={movies.length}
                    />
                )
            }

            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    )
}