import { useEffect, useState } from "react";

export default function MovieForm({ addMovie, editing, updateMovie }) {
  const [form, setForm] = useState({ title: "", genre: "", year: "" });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ title: "", genre: "", year: "" });
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    // Validaciones mínimas
    if (!form.title.trim()) return alert("Título requerido");
    const payload = { ...form, year: form.year ? Number(form.year) : null };

    if (editing && editing.id) {
      updateMovie({ ...payload, id: editing.id });
    } else {
      addMovie(payload);
    }
    setForm({ title: "", genre: "", year: "" });
  };

  return (
    <form className="bg-white p-5 rounded-lg shadow" onSubmit={submit}>
      <h2 className="text-lg font-semibold mb-3">{editing ? "Editar Película" : "Agregar Película"}</h2>

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Género"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Año"
        type="number"
        value={form.year ?? ""}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />

      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? "Actualizar" : "Agregar"}
        </button>
        {editing && (
          <button type="button" onClick={() => setForm({ title: "", genre: "", year: "" })} className="px-4 py-2 rounded border">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}