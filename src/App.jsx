import { useEffect, useState } from "react";
import axios from "axios";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

/*
  Usa VITE_API_URL (set en Vercel/Netlify) o fallback a localhost
  Formato esperado de la URL: https://tu-backend.com/api/movies
*/
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      alert("Error cargando películas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const addMovie = async (movie) => {
    await axios.post(API_BASE, movie);
    fetchMovies();
  };

  const updateMovie = async (movie) => {
    await axios.put(`${API_BASE}/${movie.id}`, movie);
    setEditing(null);
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    if (!confirm("¿Eliminar esta película?")) return;
    await axios.delete(`${API_BASE}/${id}`);
    fetchMovies();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🎬 MovieApp</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MovieForm addMovie={addMovie} editing={editing} updateMovie={updateMovie} />
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <div className="p-6 text-center">Cargando...</div>
            ) : (
              <MovieList movies={movies} onEdit={setEditing} onDelete={deleteMovie} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;