import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import Loader from "../components/Loader";
import { CATEGORY_LABELS } from "../data/staticContent";

export default function PortfolioDetail() {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    const endpoint = type === "video" ? `/api/videos/${id}` : `/api/gallery/${id}`;

    client
      .get(endpoint)
      .then(({ data }) => {
        if (active) setItem(data);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [type, id]);

  if (loading) {
    return (
      <div className="bg-paper min-h-[60vh]">
        <Loader label="Loading project" />
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="bg-paper min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-24">
        <p className="font-heading text-2xl text-ink mb-3">Project not found</p>
        <Link to="/portfolio" className="text-bronze-dark font-mono text-xs uppercase tracking-wider">
          &larr; Back to Portfolio
        </Link>
      </div>
    );
  }

  const category = CATEGORY_LABELS[item.category];

  return (
    <>
      <SEO title={item.title} description={item.description?.slice(0, 155)} />

      <section className="bg-ink">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-8 pb-0">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-plaster/60 hover:text-plaster transition-colors"
          >
            <FaArrowLeft size={12} /> Back to Portfolio
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-8 pb-14">
          {type === "video" ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={item.embed_url}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
          )}
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-bronze-dark">{category?.code}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
              {category?.label}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl text-ink mb-6">{item.title}</h1>
          <p className="text-ink/70 text-lg leading-relaxed max-w-3xl whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </section>
    </>
  );
}
