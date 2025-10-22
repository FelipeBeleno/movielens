import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetMovieFromIdQuery } from "../store/api/moviesApi";
import Loader from "../components/ui/Loader";
import { API_CONFIG } from "../utils/constants";

const DetailMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: movie, isLoading } = useGetMovieFromIdQuery(Number(id));

    if (!movie) {
        return (
            <div className="text-center text-white mt-10">
                No se encontró la película.
            </div>
        );
    }

    const imageUrl = `${API_CONFIG.IMAGE_BASE_URL}/w500${movie.poster_path}`;
    const languages = (movie.spoken_languages || [])
        .slice(0, 3)
        .map((lang) => lang.english_name)
        .join(", ");
    const stars = Math.round(movie.vote_average / 2);
    const productionCompany = movie.production_companies[0]?.name || "N/A";

    return isLoading ? (
        <Loader />
    ) : (
        <motion.div
            className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <motion.div
                className="max-w-4xl bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}

            >
                <img
                    src={imageUrl}
                    alt={movie.title}
                    className="md:w-1/2 w-full object-cover"
                    loading="lazy"
                />
                <div className="p-6 flex flex-col justify-between">
                    <div>
                        <div className="w-full flex items-end justify-end">

                            <button
                                onClick={() => navigate(-1)}
                                className="mb-4 bg-blue-600 p-2 hover:bg-blue-700 text-white rounded-full font-semibold transition"
                            >
                                ←
                            </button>
                        </div>


                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-gray-400 mb-4 italic">
                            {new Date(movie.release_date).getFullYear()}
                        </p>
                        <p className="text-gray-300 mb-4">{movie.overview}</p>

                        <div className="mb-3">
                            <span className="font-semibold">Géneros:</span>{" "}
                            {movie.genres.map((g) => g.name).join(", ")}
                        </div>

                        <div className="mb-3">
                            <span className="font-semibold">Idiomas:</span> {languages}
                        </div>

                        <div className="flex items-center mb-4">
                            <span className="font-semibold mr-2">Calificación:</span>
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-yellow-400 text-lg ${i < stars ? "opacity-100" : "opacity-30"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="ml-2 text-gray-400 text-sm">
                                ({movie.vote_average.toFixed(1)})
                            </span>
                        </div>

                        {/* Nueva información adicional */}
                        <div className="space-y-2 mt-4 text-gray-300">
                            <div>
                                <span className="font-semibold">Duración:</span> {movie.runtime} min
                            </div>
                            <div>
                                <span className="font-semibold">Presupuesto:</span> ${movie.budget.toLocaleString()}
                            </div>
                            <div>
                                <span className="font-semibold">Ingresos:</span> ${movie.revenue.toLocaleString()}
                            </div>
                            <div>
                                <span className="font-semibold">Compañía productora:</span> {productionCompany}
                            </div>
                            <div>
                                <span className="font-semibold">Estado:</span> {movie.status}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DetailMovie;
