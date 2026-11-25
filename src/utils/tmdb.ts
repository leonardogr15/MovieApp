import axios from "axios";
import { Movie } from "../types/Movie";

const BASE_URL = "https://api.themoviedb.org/3";

/** Thrown when REACT_APP_TMDB_API_KEY was not set at build time (see .env.example). */
export class MissingApiKeyError extends Error {
  constructor() {
    super("REACT_APP_TMDB_API_KEY is not set");
    this.name = "MissingApiKeyError";
  }
}

// Read at call time so a missing key is reported clearly instead of sending "undefined" to TMDB.
// Note: Create React App inlines this value into the public bundle (see README, "API key").
function apiKey(): string {
  const key = process.env.REACT_APP_TMDB_API_KEY;
  if (!key) throw new MissingApiKeyError();
  return key;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: apiKey(),
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
      api_key: apiKey(),
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
