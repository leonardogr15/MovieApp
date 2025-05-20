import React, { useState, useEffect, useCallback, useMemo } from "react";
import { searchMovies, fetchPopularMovies } from "../utils/tmdb";
import { Movie } from "../types/Movie";
import "../App.css";

interface Props {
    onAdd: (movie: Movie) => void;
    allMovies: Movie[];
    favIds: Movie["id"][];
}

export default function SearchBar({ onAdd, allMovies, favIds }: Props) {
    const [query, setQuery] = useState("");
    const [apiResults, setApiResults] = useState<Movie[]>([]);
    const [sortBy, setSortBy]   = useState<"title"|"year">("title");
    const [sortOrder, setSortOrder] = useState<"asc"|"desc">("asc");

    const sortFn = (list: Movie[]) =>
        [...list].sort((a,b) => {
        const A = sortBy==="title"?a.title.toLowerCase():+a.year;
        const B = sortBy==="title"?b.title.toLowerCase():+b.year;
        if (A<B) return sortOrder==="asc"?-1:1;
        if (A>B) return sortOrder==="asc"?1:-1;
        return 0;
        });

    const handleSearch = useCallback(async () => {
        const data = query.trim()
        ? await searchMovies(query)
        : await fetchPopularMovies();
        setApiResults(data);
    }, [query]);

    useEffect(() => { handleSearch(); }, [handleSearch]);
    useEffect(() => { if (!query) handleSearch(); }, [query, handleSearch]);

    const displayList = useMemo(() => {
        const map = new Map<number,Movie>();
        allMovies.forEach(m => map.set(m.id, m));
        apiResults.forEach(m   => map.set(m.id, m));
        return sortFn(Array.from(map.values()));
    }, [allMovies, apiResults, sortBy, sortOrder]);

    return (
        <div className="search-container">
        <form className="search-bar" onSubmit={e=>{e.preventDefault(); handleSearch();}}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value as any)} aria-label="Ordenar por">
            <option value="title">Título</option>
            <option value="year">Año</option>
            </select>

            <select value={sortOrder} onChange={e=>setSortOrder(e.target.value as any)} aria-label="Asc/Desc">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
            </select>

            <input placeholder="Buscar..." value={query} onChange={e=>setQuery(e.target.value)}/>
        </form>

        <div className="search-results">
            {displayList.map(movie => (
            <div key={movie.id} className="movie-card">
                <img src={movie.poster||"https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                    alt={movie.title} />
                <p>{movie.title} ({movie.year})</p>
                <button onClick={()=> onAdd(movie)}>
                { favIds.includes(movie.id) ? "Ya favorito" : "Agregar" }
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}
