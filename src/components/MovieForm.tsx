import React, { useState } from "react";
import { Movie } from "../types/Movie";

interface Props {
  onAdd: (movie: Movie) => void;
}

const generateId = (): number =>
  Date.now() + Math.floor(Math.random() * 1e6);

const MovieForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [posterDataUrl, setPosterDataUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPosterDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !posterDataUrl) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    onAdd({
      id: generateId(),
      title: title.trim(),
      year,                   
      poster: posterDataUrl,
    });
    setTitle("");
    setYear(new Date().getFullYear().toString());
    setPosterDataUrl("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "1rem auto" }}>
      <div>
        <label htmlFor="title">Nombre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <label htmlFor="year">Año</label>
        <input
          id="year"
          type="text"
          value={year}
          onChange={e => setYear(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <label htmlFor="poster">Póster</label>
        <input
          id="poster"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ width: "100%" }}
        />
      </div>

      {posterDataUrl && (
        <img
          src={posterDataUrl}
          alt="Preview"
          style={{ display: "block", width: 100, margin: "0.5rem auto" }}
        />
      )}

      <button type="submit" style={{ marginTop: "1rem" }}>
        Agregar Película
      </button>

      {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default MovieForm;
