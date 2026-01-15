import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import Pagination from "../components/Pagination";

export default function MoviesPag() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {

    axios.get(`/user/movies/filter?search=${search}&sortBy=${sort}&page=${currentPage}`)
      .then(data => {
        setMovies(data.data.movies);
        
        setTotalPage(data.data.totalPage);
        // console.log("movie res:", data.data);
      }).catch((err) => console.error(err));

    }, [search, sort, currentPage]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-4">
        <SearchBar search={search} setSearch={setSearch} />
        <SortSelect sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
          />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
}
