import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    // If not login redirect login page.
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // If logedin allow access.
    return children;

}