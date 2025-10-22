import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { MovieResponse } from "../types/movie.id.type";

const DetailMovie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGNlNDRkZDJkMWVkZjA0ODc3NmNjOWNkZWVjNDJlNyIsIm5iZiI6MTY2MjMwNjAwNi4wOTQsInN1YiI6IjYzMTRjNmQ2MGQyOTQ0MDA4MWQ5YzZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7UxjrFoBd_k6oY1EZoAOYX51X-ueL3X246OktWEAy1s",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-xl">
                Cargando...
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="text-center text-white mt-10">
                No se encontró la película.
            </div>
        );
    }

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const languages = (movie.spoken_languages || [])
        .slice(0, 3)
        .map((lang) => lang.english_name)
        .join(", ");

    const stars = Math.round(movie.vote_average / 2); // 0-10 → 0-5 estrellas

    return (
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
                    </div>

                    <a
                        href={movie.homepage!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                    >
                        Ver más
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DetailMovie;
