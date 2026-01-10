import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
// import { baseUrl } from "../constants/url";

export default function MoviesPag() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    // fetch(`${import.meta.env.VITE_BASE_URL}/user/movies/filter?search=${search}&sortBy=${sort}`)
    //   .then(res => res.json())
    //   .then(data => {
    //       setMovies(data.movies)
    //       console.log("movie data:", data.movies)
    //     });

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/movies/filter?search=${search}&sortBy=${sort}`)
      .then(data => {
        setMovies(data.data.movies)
        // console.log("movieData:", data.data.movies)
      })

    }, [search, sort]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-4">
        <SearchBar search={search} setSearch={setSearch} />
        <SortSelect sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
