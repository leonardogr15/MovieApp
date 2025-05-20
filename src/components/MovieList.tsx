import React from "react";
import { Movie } from "../types/Movie";

interface Props {
  movies: Movie[];
  onRemove: (id: Movie["id"]) => void;
}

const MovieList: React.FC<Props> = ({ movies, onRemove }) => {
  if (movies.length === 0) {
    return <p>No hay películas favoritas</p>;
  }

  return (
    <div className="search-results">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={
              movie.poster ||
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
            }
            alt={movie.title}
          />
          <p>
            {movie.title} ({movie.year})
          </p>
          <button style={{backgroundColor:"#e02727"}} onClick={() => onRemove(movie.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
