import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import type { Movie } from "../types/movie.type";
import type { MovieResponse } from '../types/movie.type';
import { useNavigate } from "react-router-dom";


const Home = () => {


    const [movies, setMovies] = useState<MovieResponse>([])
    const navigate = useNavigate();

    useEffect(() => {

        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-CO&page=1&sort_by=popularity.desc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGNlNDRkZDJkMWVkZjA0ODc3NmNjOWNkZWVjNDJlNyIsIm5iZiI6MTY2MjMwNjAwNi4wOTQsInN1YiI6IjYzMTRjNmQ2MGQyOTQ0MDA4MWQ5YzZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7UxjrFoBd_k6oY1EZoAOYX51X-ueL3X246OktWEAy1s'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then((json: MovieResponse) => setMovies(json))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    🎥 MovieLens
                </motion.h1>

                <motion.div
                    className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    initial="hidden"
                    animate="visible"
                >

                    {movies?.results?.map((movie: Movie, i: number) => (
                        <motion.div
                            onClick={() => {
                                navigate('/movie/' + movie.id);
                            }}
                            key={movie.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-4 text-center space-y-2">

                                <h2 className="text-lg font-semibold text-white">{movie.title}</h2>

                                {/* Año de lanzamiento */}
                                <p className="text-gray-400 text-sm">
                                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "Sin fecha"}
                                </p>


                                <div className="flex justify-center items-center">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span key={index} className="text-yellow-400 text-lg">
                                            {index < Math.round(movie.vote_average / 2) ? "⭐" : "☆"}
                                        </span>
                                    ))}
                                    <span className="text-sm text-gray-400 ml-2">
                                        {movie.vote_average?.toFixed(1)}/10
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                    ))}

                </motion.div>
            </div>
        </div>
    )
}

export default Home