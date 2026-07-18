import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import client from "../../api/client";
import Loader from "../../components/Loader";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "../../data/staticContent";

const EMPTY_IMAGE_FORM = { title: "", description: "", category: "construction" };
const EMPTY_VIDEO_FORM = { title: "", description: "", category: "construction", youtube_url: "" };

function CategorySelect({ value, onChange, id }) {
  return (
    <select id={id} value={value} onChange={onChange} required className="w-full">
      {CATEGORY_ORDER.map((key) => (
        <option key={key} value={key}>
          {CATEGORY_LABELS[key].label}
        </option>
      ))}
    </select>
  );
}

// -----------------------------------------------------------------------
// Images
// -----------------------------------------------------------------------

function ImagesPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_IMAGE_FORM);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function loadItems() {
    setLoading(true);
    client
      .get("/api/gallery/", { params: { limit: 50 } })
      .then(({ data }) => setItems(data.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(loadItems, []);

  function resetForm() {
    setForm(EMPTY_IMAGE_FORM);
    setFile(null);
    setPreview(null);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function startEdit(item) {
    setForm({ title: item.title, description: item.description, category: item.category });
    setEditingId(item.id);
    setPreview(item.image_url);
    setFile(null);
    setShowForm(true);
    setError("");
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!editingId && !file) {
      setError("Please choose an image to upload.");
      return;
    }
    setSaving(true);
    setError("");

    const body = new FormData();
    body.append("title", form.title);
    body.append("description", form.description);
    body.append("category", form.category);
    if (file) body.append("file", file);

    try {
      if (editingId) {
        await client.put(`/api/gallery/${editingId}`, body);
      } else {
        await client.post("/api/gallery/", body);
      }
      resetForm();
      loadItems();
    } catch (err) {
      setError(err?.response?.data?.detail || "Couldn't save this image. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this photo? This can't be undone.")) return;
    try {
      await client.delete(`/api/gallery/${id}`);
      loadItems();
    } catch {
      window.alert("Couldn't delete this photo. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-ink/50 text-sm">{items.length} photo{items.length === 1 ? "" : "s"}</p>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-ink text-plaster font-mono text-xs uppercase tracking-wider hover:bg-ink-light transition-colors"
          >
            <FaPlus size={11} /> Add Photo
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 p-6 mb-8 space-y-4">
          <div>
            <label htmlFor="img-file" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Photo {editingId && "(leave empty to keep current image)"}
            </label>
            <input id="img-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 w-40 h-32 object-cover border border-ink/10" />
            )}
          </div>
          <div>
            <label htmlFor="img-title" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Title
            </label>
            <input
              id="img-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="img-category" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Category
            </label>
            <CategorySelect
              id="img-category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="img-description" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Description
            </label>
            <textarea
              id="img-description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full"
            />
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-bronze text-ink font-mono text-xs uppercase tracking-wider hover:bg-bronze-light transition-colors disabled:opacity-50"
            >
              <FaUpload size={11} /> {saving ? "Saving..." : editingId ? "Save Changes" : "Upload"}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-ink/10 overflow-hidden group">
              <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-bronze-dark mb-1">
                  {CATEGORY_LABELS[item.category]?.label}
                </p>
                <h3 className="font-heading text-ink leading-snug line-clamp-1">{item.title}</h3>
                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="flex items-center gap-1.5 text-xs font-mono uppercase text-ink/60 hover:text-ink"
                  >
                    <FaEdit size={11} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1.5 text-xs font-mono uppercase text-red-700/70 hover:text-red-700"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Videos
// -----------------------------------------------------------------------

function extractYoutubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function VideosPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_VIDEO_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function loadItems() {
    setLoading(true);
    client
      .get("/api/videos/", { params: { limit: 50 } })
      .then(({ data }) => setItems(data.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(loadItems, []);

  function resetForm() {
    setForm(EMPTY_VIDEO_FORM);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function startEdit(item) {
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      youtube_url: item.youtube_url,
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
      if (editingId) {
        await client.put(`/api/videos/${editingId}`, form);
      } else {
        await client.post("/api/videos/", form);
      }
      resetForm();
      loadItems();
    } catch (err) {
      setError(err?.response?.data?.detail || "Couldn't save this video. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this video? This can't be undone.")) return;
    try {
      await client.delete(`/api/videos/${id}`);
      loadItems();
    } catch {
      window.alert("Couldn't delete this video. Please try again.");
    }
  }

  const previewId = extractYoutubeId(form.youtube_url || "");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-ink/50 text-sm">{items.length} video{items.length === 1 ? "" : "s"}</p>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-ink text-plaster font-mono text-xs uppercase tracking-wider hover:bg-ink-light transition-colors"
          >
            <FaPlus size={11} /> Add Video
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 p-6 mb-8 space-y-4">
          <div>
            <label htmlFor="vid-url" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              YouTube URL
            </label>
            <input
              id="vid-url"
              required
              placeholder="https://youtu.be/..."
              value={form.youtube_url}
              onChange={(e) => setForm((f) => ({ ...f, youtube_url: e.target.value }))}
              className="w-full"
            />
            {form.youtube_url && !previewId && (
              <p className="mt-2 text-xs text-red-700">
                That doesn't look like a valid YouTube URL yet.
              </p>
            )}
            {previewId && (
              <img
                src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`}
                alt="Video thumbnail preview"
                className="mt-3 w-40 h-24 object-cover border border-ink/10"
              />
            )}
          </div>
          <div>
            <label htmlFor="vid-title" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Title
            </label>
            <input
              id="vid-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="vid-category" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Category
            </label>
            <CategorySelect
              id="vid-category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="vid-description" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
              Description
            </label>
            <textarea
              id="vid-description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Video"}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-ink/10 overflow-hidden">
              <img src={item.thumbnail_url} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-bronze-dark mb-1">
                  {CATEGORY_LABELS[item.category]?.label}
                </p>
                <h3 className="font-heading text-ink leading-snug line-clamp-1">{item.title}</h3>
                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="flex items-center gap-1.5 text-xs font-mono uppercase text-ink/60 hover:text-ink"
                  >
                    <FaEdit size={11} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1.5 text-xs font-mono uppercase text-red-700/70 hover:text-red-700"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------

export default function AdminMedia() {
  const [tab, setTab] = useState("images");

  return (
    <div>
      <h1 className="font-heading text-3xl text-ink mb-2">Gallery &amp; Videos</h1>
      <p className="text-ink/50 mb-6">
        Upload project photos (stored on Cloudinary) and link YouTube videos, each with a title,
        description, and category.
      </p>

      <div className="flex border border-ink/15 w-fit mb-8">
        {[
          { key: "images", label: "Photos" },
          { key: "videos", label: "Videos" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              tab === t.key ? "bg-ink text-plaster" : "text-ink/60 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "images" ? <ImagesPanel /> : <VideosPanel />}
    </div>
  );
}
