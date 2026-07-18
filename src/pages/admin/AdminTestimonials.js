import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaStar, FaTrash } from "react-icons/fa";
import client from "../../api/client";
import Loader from "../../components/Loader";

const EMPTY_FORM = { client_name: "", message: "", rating: 5, project_type: "" };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function loadItems() {
    setLoading(true);
    client
      .get("/api/testimonials/", { params: { limit: 50 } })
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(loadItems, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function startEdit(item) {
    setForm({
      client_name: item.client_name,
      message: item.message,
      rating: item.rating,
      project_type: item.project_type || "",
    });
    setEditingId(item.id);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, rating: Number(form.rating) };
      if (editingId) {
        await client.put(`/api/testimonials/${editingId}`, payload);
      } else {
        await client.post("/api/testimonials/", payload);
      }
      resetForm();
      loadItems();
    } catch (err) {
      setError(err?.response?.data?.detail || "Couldn't save this testimonial.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await client.delete(`/api/testimonials/${id}`);
      loadItems();
    } catch {
      window.alert("Couldn't delete this testimonial. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading text-3xl text-ink">Testimonials</h1>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-ink text-plaster font-mono text-xs uppercase tracking-wider hover:bg-ink-light transition-colors"
          >
            <FaPlus size={11} /> Add Testimonial
          </button>
        )}
      </div>
      <p className="text-ink/50 mb-6">Shown in a rotating carousel on the homepage.</p>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 p-6 mb-8 space-y-4 max-w-xl">
          <div>
            <label htmlFor="t-name" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Client Name
            </label>
            <input
              id="t-name"
              required
              value={form.client_name}
              onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="t-rating" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                Rating
              </label>
              <select
                id="t-rating"
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                className="w-full"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="t-project" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                Project Type (optional)
              </label>
              <input
                id="t-project"
                value={form.project_type}
                onChange={(e) => setForm((f) => ({ ...f, project_type: e.target.value }))}
                placeholder="e.g. Steel Fabrication"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="t-message" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Testimonial
            </label>
            <textarea
              id="t-message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full"
            />
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-bronze text-ink font-mono text-xs uppercase tracking-wider hover:bg-bronze-light transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Testimonial"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-ink/20 text-ink/60 font-mono text-xs uppercase tracking-wider hover:bg-ink/5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-ink/10 p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex gap-0.5 text-bronze mb-1.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} size={12} />
                  ))}
                </div>
                <p className="text-ink/80 max-w-xl">{item.message}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/40">
                  {item.client_name}
                  {item.project_type ? ` \u2014 ${item.project_type}` : ""}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  aria-label="Edit testimonial"
                  className="text-ink/50 hover:text-ink"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label="Delete testimonial"
                  className="text-red-700/60 hover:text-red-700"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
