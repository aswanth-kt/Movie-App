import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import MoviesPage from "./pages/MoviesPage"
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
