import React, { useEffect, useState } from "react";
import { Movie } from "./types/Movie";
import {
  loadAll,
  saveAll,
  loadFavIds,
  saveFavIds,
} from "./utils/localStorage";
import SearchBar from "./components/SearchBar";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [favIds, setFavIds] = useState<Movie["id"][]>([]);
  const [view, setView] = useState<"search" | "add" | "favorites">("search");
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState<
    { msg: string; type: "success" | "error" } | null
  >(null);

  useEffect(() => {
    setAllMovies(loadAll());
    setFavIds(loadFavIds());
  }, []);

  useEffect(() => {
    saveAll(allMovies);
    saveFavIds(favIds);
  }, [allMovies, favIds]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
  };

  const addMovie = (movie: Movie) => {
    const exists = allMovies.some(
      (m) =>
        m.title.trim().toLowerCase() === movie.title.trim().toLowerCase() &&
        m.year === movie.year
    );
    if (exists) {
      showToast("Ya existe una película con ese título y año", "error");
      return;
    }

    setAllMovies((prev) => [...prev, movie]);
    setFavIds((prev) => [...prev, movie.id]);
    showToast("¡Película agregada a Favoritas!", "success");
  };

  const removeMovie = (id: Movie["id"]) => {
    setFavIds((prev) => prev.filter((x) => x !== id));
    showToast("Película eliminada de Favoritas", "error");
  };

  return (
    <div className="App">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)} />}

      <button className="hamburger" onClick={()=>setNavOpen(o=>!o)}>☰</button>
      <nav className={`sidebar ${navOpen?"open":""}`}>
        <button onClick={()=>{setView("search");    setNavOpen(false);}}>Buscar Películas</button>
        <button onClick={()=>{setView("add");       setNavOpen(false);}}>Agregar Película</button>
        <button onClick={()=>{setView("favorites"); setNavOpen(false);}}>Favoritas</button>
      </nav>

      <header><h1>Películas</h1></header>

      <main>
        {view==="search" && (
          <SearchBar 
            onAdd={addMovie} 
            allMovies={allMovies} 
            favIds={favIds} 
          />
        )}
        {view==="add" && <MovieForm onAdd={addMovie} />}

        {view==="favorites" && (
          <MovieList 
            movies={allMovies.filter(m=>favIds.includes(m.id))} 
            onRemove={removeMovie} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
