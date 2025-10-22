import { motion } from 'framer-motion';
import type { Movie } from "../types/movie.type";
import { useNavigate } from "react-router-dom";
import { useGetMoviesQuery } from "../store/api/moviesApi";
import { useState } from 'react';
import Loader from '../components/ui/Loader';
import { API_CONFIG } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPage } from '../store/movieSlice';
import type { RootState } from "../store/store";
import LazyImage from '../components/ui/LazyImage';

const Home = () => {

    const initializedPage = useSelector((state: RootState) => state.movie.initializedPage);
    const [paginate, setPaginate] = useState(initializedPage || 1);
    const { data, isFetching } = useGetMoviesQuery(paginate);
    const navigate = useNavigate();


    const dispatch = useDispatch();


    return isFetching ? <Loader /> : (
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


                <div className="flex justify-center items-center gap-4 mb-8">
                    <button
                        onClick={() => {
                            setPaginate((p) => {
                                const newPage = p - 1;
                                dispatch(uploadPage(newPage));
                                return newPage;
                            });
                        }}
                        disabled={paginate === 1 || isFetching}
                        className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        ← Anterior
                    </button>

                    <span className="text-gray-300">Página {paginate}</span>

                    <button
                        onClick={() => {
                            setPaginate((p) => {
                                const newPage = p + 1;
                                dispatch(uploadPage(newPage));
                                return newPage;
                            });
                        }}
                        disabled={isFetching}
                        className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Siguiente →
                    </button>
                </div>

                <motion.div
                    className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    initial="hidden"
                    animate="visible"
                >
                    {data?.results?.map((movie: Movie) => (
                        <motion.div
                            onClick={() => navigate('/movie/' + movie.id)}
                            key={movie.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <LazyImage
                                alt={movie.title}
                                src={`${API_CONFIG.IMAGE_BASE_URL}/original/${movie.poster_path}`}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-4 text-center space-y-2">
                                <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
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
    );
};

export default Home;
