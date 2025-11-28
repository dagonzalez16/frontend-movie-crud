export default function MovieList({ movies = [], onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Películas</h2>

      {movies.length === 0 ? (
        <div className="text-gray-500">No hay películas aún.</div>
      ) : (
        <div className="space-y-3">
          {movies.map((m) => (
            <div key={m.id ?? m._id ?? m.id} className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 rounded">
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-gray-600">{m.genre} • {m.year}</div>
              </div>

              <div className="mt-3 sm:mt-0 flex gap-2">
                <button onClick={() => onEdit({ id: m.id ?? m._id ?? m.id, title: m.title, genre: m.genre, year: m.year })} className="px-3 py-1 bg-yellow-400 rounded">
                  Editar
                </button>

                <button onClick={() => onDelete(m.id ?? m._id ?? m.id)} className="px-3 py-1 bg-red-600 text-white rounded">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}