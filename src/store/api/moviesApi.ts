import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../../utils/constants';
import type { MovieResponse } from '../../types/movie.type';

import type {MovieResponse as MovieResponseFromId} from '../../types/movie.id.type';
import type {  TMDBPopularResponse } from '../../types/popular.api';


export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`
        }
    }),
    endpoints: (builder) => ({
        getMovies: builder.query<MovieResponse, number>({
            query: (page) => `/discover/movie?include_adult=false&include_video=false&language=es-CO&page=${page}&sort_by=popularity.desc`
        }),
        getMovieFromId: builder.query<MovieResponseFromId, number>({
            query: (id: number) => `/movie/${id}?language=es-ES`
        }),
        getPopularMovies: builder.query<TMDBPopularResponse, void>({
            query: () => `/discover/movie?include_adult=false&include_video=false&language=es-CO&page=1&sort_by=popularity.desc`
        })

    })
})



export const { useGetMoviesQuery, useGetMovieFromIdQuery, useGetPopularMoviesQuery } = moviesApi;