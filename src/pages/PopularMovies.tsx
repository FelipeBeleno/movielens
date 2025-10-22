
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { useGetPopularMoviesQuery } from "../store/api/moviesApi";
import Loader from "../components/ui/Loader";
import { API_CONFIG } from "../utils/constants";
import LazyImage from "../components/ui/LazyImage";

const PopularMovies = () => {

    const { data: movies, isLoading } = useGetPopularMoviesQuery()

    const navigate = useNavigate();


    return isLoading ? <Loader /> : (
        <section className="w-full min-h-[70vh] md:min-h-[80vh] relative text-white px-4 md:px-8 mt-8 md:mt-12">
            <div className="max-w-7xl mx-auto h-full">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="h-full rounded-2xl overflow-hidden shadow-lg"
                >
                    {movies !== undefined && movies.results.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <motion.div
                                onClick={() => {
                                    navigate('/movie/' + movie.id);
                                }}
                                className="relative w-full h-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >

                                <LazyImage
                                    src={`${API_CONFIG.IMAGE_BASE_URL}/original/${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover brightness-75"
                                />

                                <div className="absolute bottom-0 left-0 p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent w-full">
                                    <motion.h2
                                        className="text-2xl md:text-4xl font-bold mb-2"
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {movie.title}
                                    </motion.h2>
                                    <motion.p
                                        className="max-w-3xl text-gray-300 text-sm md:text-base line-clamp-4 md:line-clamp-none"
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {movie.overview}
                                    </motion.p>
                                    <motion.div
                                        className="mt-4 flex items-center gap-2 text-yellow-400"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        ⭐ {movie.vote_average.toFixed(1)} / 10
                                    </motion.div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PopularMovies;
