import Pagination from "./Pagination";

export default function MovieCard({ movie }) {
    return (
        <div className="bg-secondary rounded-xl overflow-hidden shadow hover:scale-[1.02] transition">
            <img 
                src={`${import.meta.env.VITE_POST_URL}/${movie.imageUrl}`}
                alt={movie.title}
                className="h-56 w-full object-cover"
            />

            <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">
                    {movie.title}
                </h2>

                <p className="text-sm text-muted line-clamp-3">
                    {movie.description}
                </p>

                <div className="flex justify-between text-sm pt-2">
                    <span> ⭐ {movie.rating} </span>
                    <span>
                        Release date: {new Date(movie.releaseDate).toLocaleDateString('en-GB')}
                    </span>
                </div>
            </div>
        </div>
    )
}