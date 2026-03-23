import axios from "axios";
import type { Movie } from '../types/movie'

const token = import.meta.env.VITE_TMDB_TOKEN;

export interface ApiResponse<T> {
    results: T[];
    total_pages: number;
}

export default async function fetchMovies(query:string, currentPage:number): Promise<ApiResponse<Movie>> {
    const response = await axios.get<ApiResponse<Movie>>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            query,
            page: currentPage,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
        
    return response.data;
    
}


