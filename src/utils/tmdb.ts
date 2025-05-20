import axios from "axios";
import { Movie } from "../types/Movie";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return res.data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] ?? "N/A",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "",
  }));
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });

  return res.data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] ?? "N/A",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "",
  }));
};
