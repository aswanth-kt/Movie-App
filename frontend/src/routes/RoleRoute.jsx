import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    };

    // If not login redirect login page.
    if (!user) {
        return <Navigate to="/login" replace />
    };

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" />
    };

    // Permission granted
    return children;

}