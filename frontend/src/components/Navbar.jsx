import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="bg-secondary px-6 py-4 flex justify-between items-center shadow">
            <h1 className="text-xl font-bold text-accent">
                Movie App
            </h1>

            <div className="flex gap-6 text-sm">
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
                    Admin Dashboard
                </Link>
        
                <Link
                    to="/login"
                    className="text-muted hover:text-accent transition"
                >
                    Login
                </Link>
            </div>
        </nav>
    )
}