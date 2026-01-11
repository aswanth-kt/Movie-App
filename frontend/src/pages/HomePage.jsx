import { Link } from "react-router-dom";
import bannerImg from "../../src/assets/Banner/banner.png"

export default function HomePage() {
    return (
        <section 
            className="min-h-[90vh] flex items-center justify-center px-6 
            bg-cover bg-center bg-no-repeat relative"
            style={{backgroundImage: `url(${bannerImg})`}}
        >
            <div className="max-w-3xl text-center space-y-8">
            
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    “Cinema is a mirror by which we often see ourselves.”
                </h1>

                <p className="text-muted text-lg">
                    Discover stories, emotions, and ideas from movies across genres.
                    Search, sort, and explore - all in one place.
                </p>

                <div className="pt-6">
                    <Link
                        to="/movies"
                        className="inline-block bg-accent text-primary px-8 py-4 rounded-xl
                        font-semibold text-lg hover:opacity-90 hover:text-white transition"
                    >
                        Explore Movies
                    </Link>
                </div>

            </div>
        </section>
    );
}
