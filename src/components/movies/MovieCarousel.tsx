import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie.type';




interface MovieCarouselProps {
  movies: Movie[];
}

/**
 * Carrusel de películas destacadas usando Swiper.js
 * Muestra películas en formato hero con backdrop, título y descripción
 */
export const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full mb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        className="h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden"
      >
        {movies.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id}>
            <CarouselSlide movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

/**
 * Slide individual del carrusel
 * Muestra una película en formato hero
 */
const CarouselSlide = ({ movie }: { movie: Movie }) => {
  // Función helper para construir URL de imagen
  const getImageUrl = (path: string | null): string => {
    if (!path) return 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Image';
    return `https://image.tmdb.org/t/p/original${path}`;
  };

  // Función helper para formatear rating
  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  const backdropUrl = getImageUrl(movie.backdrop_path || movie.poster_path);
  const rating = formatRating(movie.vote_average);

  return (
    <div className="relative w-full h-full">
      {/* Imagen de fondo */}
      <img
        src={backdropUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback si la imagen no carga
          e.currentTarget.src = 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Image';
        }}
      />

      {/* Overlay oscuro con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16"
      >
        <div className="max-w-3xl">
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400 text-2xl">⭐</span>
            <span className="text-white text-xl font-bold">{rating}</span>
          </div>

          {/* Título */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {movie.title}
          </h2>

          {/* Descripción */}
          <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-6 line-clamp-3">
            {movie.overview || 'Sin descripción disponible'}
          </p>

          {/* Botón */}
          <Link
            to={`/movie/${movie.id}`}
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Ver Detalles
          </Link>
        </div>
      </motion.div>
    </div>
  );
};