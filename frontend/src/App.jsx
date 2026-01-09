import MovieCard from "./components/MovieCard"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import SortSelect from "./components/SortSelect"
import MoviesPage from "./pages/MoviesPage"


function App() {

  return (
    <div>
      <Navbar />
      {/* <MovieCard />
      <SearchBar />
      <SortSelect /> */}
      <MoviesPage />
    </div>
  )
}

export default App
