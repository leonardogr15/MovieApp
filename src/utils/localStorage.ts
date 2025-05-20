import { Movie } from "../types/Movie";

const KEY = "movie_list";

export const saveMovies = (movies: Movie[]) =>
  localStorage.setItem(KEY, JSON.stringify(movies));

export const loadMovies = (): Movie[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const loadAll = (): Movie[] =>
  JSON.parse(localStorage.getItem("all-movies") || "[]");

export const saveAll = (movies: Movie[]) =>
  localStorage.setItem("all-movies", JSON.stringify(movies));

export const loadFavIds = (): Movie["id"][] =>
  JSON.parse(localStorage.getItem("fav-ids") || "[]");

export const saveFavIds = (ids: Movie["id"][]) =>
  localStorage.setItem("fav-ids", JSON.stringify(ids));
