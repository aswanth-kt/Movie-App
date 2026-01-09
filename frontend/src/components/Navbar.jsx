export default function Navbar() {
    return (
        <nav className="bg-secondary px-6 py-4 flex justify-between items-center shadow">
            <h1 className="text-xl font-bold text-accent">
                Movie App
            </h1>

            <div className="flex gap-6 text-sm">
                <button className="text-muted hover:text-accent transition">
                    Movies
                </button>
                <button className="text-muted hover:text-accent transition">
                    Admin
                </button>
                <button className="text-muted hover:text-accent transition">
                    Logout
                </button>
            </div>
        </nav>
    )
}