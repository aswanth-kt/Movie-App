import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import MoviesPage from "./pages/MoviesPage"
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import SingnupPage from "./pages/SignupPage";
import AddMovie from "./pages/AddMovie";
import RoleRoute from "./routes/RoleRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ManageMovies from "./pages/ManageMovies";
import EditMovie from "./pages/EditMovie";


function App() {

  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route 
          path="/movies" 
          element={
            <ProtectedRoute>
              <MoviesPage />
            </ProtectedRoute>
          } 
        />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<SingnupPage />} />

        <Route 
          path="/admin/dashboard" 
          element={
            <RoleRoute allowedRoles={["admin"]} >
              <AdminDashboard />
            </RoleRoute>
          } 
        />
        
        <Route 
          path="/admin/add-movie" 
          element={
            <RoleRoute allowedRoles={["admin"]} >
              <AddMovie />
            </RoleRoute>
          } 
        />

        <Route 
          path="/admin/manage-movies"
          element= {
            <RoleRoute allowedRoles={["admin"]} >
              <ManageMovies />
            </RoleRoute>
          }
        />

        <Route 
          path="/admin/edit-movie/:id"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <EditMovie />
            </RoleRoute>
          }
        />

      </Routes>

    </div>
  )
}

export default App
