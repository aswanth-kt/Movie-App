import { Link, useLocation } from "react-router-dom";

export default function AdminDashboard({movieCount = 0}) {
    const { state } = useLocation();

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-secondary rounded-xl p-6 shadow">
                    <p className="text-muted text-sm">Total Movies</p>
                    <h2 className="text-4xl font-bold mt-2 text-accent">{movieCount}</h2>
                </div>
            </div>

            <div className="bg-secondary rounded-xl p-6 flex flex-col md:flex-row gap-4">
                <Link
                    to="/admin/add-movie"
                    className="flex-1 text-center bg-accent text-primary
                    py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                    ➕ Add Movie
                </Link>

                <Link
                    to="/admin/movies"
                    className="flex-1 text-center border border-accent
                    text-accent py-4 rounded-xl font-semibold
                    hover:bg-accent hover:text-primary transition"
                >
                    ✏️ Edit Movies
                </Link>
            </div>
            <p>msg : {state?.message ? state.message : "No msg"} </p>
        </div>
    );
}
