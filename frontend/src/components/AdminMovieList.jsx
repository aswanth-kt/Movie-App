import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../../api/axios";

const mySwal = withReactContent(Swal);

export default function AdminMovieList({ movie, allMovies, setMovies, isEmpty }) {

    const handleDeleteMovie = async (id) => {

        
        const deleteConfirm = await mySwal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        });

        if (!deleteConfirm.isConfirmed) {
            return toast.warning("The movie was not deleted")
        };

        try {

            const responce = await axios.delete(`/admin/movies/${id}`);
            // console.log("Delete res:", responce.data);

            if(responce.status === 200 && responce.data.success) {
                toast.success(responce.data.message);

                // Update in UI.
                const updatedMovies = allMovies.filter((movie) => movie._id !== id)
                setMovies(updatedMovies);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed")
            console.error(error.message);
        }
    }

    return (

        <div className="space-y-4">
            <div className="flex items-center gap-4 bg-secondary p-4 rounded-xl shadow">
                
                <img 
                    src={`${import.meta.env.VITE_POST_URL}/${movie.imageUrl}`}
                    alt={movie.title} 
                    className="w-24 h-32 object-cover rounded-lg"
                />

                <h2 className="flex-1 text-lg font-semibold">
                    {movie.title}
                </h2>

                <div className="flex gap-3">
                    <Link 
                        to={`/admin/edit-movie/${movie._id}`}
                        className="px-4 py-2 rounded-lg border border-accent text-accent
                        hover:bg-accent hover:text-primary transition"
                    >
                        Edit
                    </Link>
                </div>

               <button
                onClick={() => handleDeleteMovie(movie._id)}
                className="px-4 py-2 rounded-lg bg-danger text-white hover:opacity-90 transition"
               >
                Delete
               </button>

               {
                isEmpty === 0 && (
                    <p className="text-muted text-center pt-10">
                        No movies fount.
                    </p>
                )
               }

            </div>
        </div>
    )
}