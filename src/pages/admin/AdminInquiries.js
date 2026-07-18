import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from "react-icons/fa";
import client from "../../api/client";
import Loader from "../../components/Loader";
import { CATEGORY_LABELS } from "../../data/staticContent";

export default function AdminInquiries() {
  const context = useOutletContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  function loadItems() {
    setLoading(true);
    client
      .get("/api/inquiries/", { params: { limit: 100 } })
      .then(({ data }) => setItems(data.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(loadItems, []);

  async function handleExpand(item) {
    const willOpen = expandedId !== item.id;
    setExpandedId(willOpen ? item.id : null);
    if (willOpen && !item.is_read) {
      try {
        await client.patch(`/api/inquiries/${item.id}/read`);
        setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_read: true } : i)));
        context?.refreshUnread?.();
      } catch {
        // Non-critical — the inquiry is still viewable even if the flag didn't update.
      }
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await client.delete(`/api/inquiries/${id}`);
      loadItems();
      context?.refreshUnread?.();
    } catch {
      window.alert("Couldn't delete this inquiry. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-ink mb-2">Inquiries</h1>
      <p className="text-ink/50 mb-6">Messages submitted through the website contact form.</p>

      {loading ? (
        <Loader />
      ) : items.length === 0 ? (
        <p className="text-ink/50 py-12 text-center border border-dashed border-ink/15">
          No inquiries yet.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-ink/10">
              <button
                type="button"
                onClick={() => handleExpand(item)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.is_read ? (
                    <FaEnvelopeOpen className="text-ink/30 shrink-0" size={15} />
                  ) : (
                    <FaEnvelope className="text-bronze shrink-0" size={15} />
                  )}
                  <div className="min-w-0">
                    <p className={`truncate ${item.is_read ? "text-ink/70" : "font-semibold text-ink"}`}>
                      {item.name}
                      {item.service_interested && (
                        <span className="ml-2 font-mono text-[10px] uppercase text-bronze-dark">
                          {CATEGORY_LABELS[item.service_interested]?.label || item.service_interested}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-ink/40 truncate">{item.email}</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-ink/40 shrink-0">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </button>

              {expandedId === item.id && (
                <div className="px-4 pb-4 pt-1 border-t border-ink/5">
                  <p className="text-ink/80 whitespace-pre-line mb-3">{item.message}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink/50 font-mono">
                    <span>{item.email}</span>
                    {item.phone && <span>{item.phone}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-mono uppercase text-red-700/70 hover:text-red-700"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
