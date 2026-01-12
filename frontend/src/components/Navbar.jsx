import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className="bg-secondary px-6 py-4 flex justify-between items-center shadow">
            <Link 
                to="/"
                className="text-xl font-bold text-accent"
            >
                Movie App
            </Link>

            <div className="flex gap-6 text-sm">
                <span
                    className="text-muted hover:text-accent transition"
                >
                    {
                        user ? `Hi ${user.name}!` : "Hi, User!"
                    }
                </span>

                <Link
                    to="/movies"
                    className="text-muted hover:text-accent transition"
                >
                    Movies
                </Link>

                <Link
                    to="/admin-dashboard"
                    className="text-muted hover:text-accent transition"
                >
                    {
                        user?.role === 'admin' ? "Dashboard" : ""
                    }
                </Link>
        
                <Link
                    to="/login"
                    className="text-muted hover:text-accent transition"
                >
                    {
                        user ?
                        <span onClick={logout}>Logout</span>
                        : <span>Login</span>
                    }
                </Link>
            </div>
        </nav>
    )
}