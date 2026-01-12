import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import MoviesPage from "./pages/MoviesPage"
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import SingnupPage from "./pages/SignupPage";


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<SingnupPage />} />
      </Routes>
    </div>
  )
}

export default App
