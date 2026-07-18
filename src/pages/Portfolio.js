import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import CategoryFilter from "../components/CategoryFilter";
import MediaCard from "../components/MediaCard";
import Loader from "../components/Loader";

export default function Portfolio() {
  const [tab, setTab] = useState("image"); // "image" | "video"
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const endpoint = tab === "video" ? "/api/videos/" : "/api/gallery/";
    const params = { limit: 24 };
    if (category) params.category = category;
    if (debouncedSearch) params.search = debouncedSearch;

    client
      .get(endpoint, { params })
      .then(({ data }) => {
        if (active) setItems(data.items);
      })
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [tab, category, debouncedSearch]);

  return (
    <>
      <SEO
        title="Portfolio"
        description="Browse completed construction, steel fabrication, glass and aluminium, and interior fitting projects by Rateng Construction and Interiors."
      />

      <section className="bg-ink bg-blueprint-grid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-bronze-light mb-5">
            Sheet Index &mdash; Portfolio
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold text-plaster leading-tight">
            Our Work
          </h1>
          <p className="mt-5 text-plaster/70 max-w-2xl text-lg">
            Photos and videos from completed projects, searchable by keyword or service category.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Search + tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
            <div className="relative w-full lg:max-w-sm">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={14} />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects (e.g. gate, kitchen, curtain wall)"
                aria-label="Search portfolio"
                className="w-full pl-11"
              />
            </div>
            <div className="flex border border-ink/15 w-fit">
              {["image", "video"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                    tab === t ? "bg-ink text-plaster" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {t === "image" ? "Photos" : "Videos"}
                </button>
              ))}
            </div>
          </div>

          <CategoryFilter value={category} onChange={setCategory} />

          <div className="mt-10">
            {loading ? (
              <Loader label="Loading portfolio" />
            ) : items.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-ink/15">
                <p className="font-heading text-xl text-ink/70">Nothing here yet</p>
                <p className="mt-2 text-sm text-ink/50">
                  {search || category
                    ? "Try a different search term or category."
                    : "New project photos and videos are added regularly \u2014 check back soon."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <MediaCard key={item.id} item={item} type={tab} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
