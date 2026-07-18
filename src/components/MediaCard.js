import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { CATEGORY_LABELS } from "../data/staticContent";

// item: gallery item (image_url) or video item (thumbnail_url), disambiguated by `type`
export default function MediaCard({ item, type }) {
  const image = type === "video" ? item.thumbnail_url : item.image_url;
  const label = CATEGORY_LABELS[item.category]?.label;
  const code = CATEGORY_LABELS[item.category]?.code;

  return (
    <Link
      to={`/portfolio/${type}/${item.id}`}
      className="group block bg-ink relative overflow-hidden aspect-[4/3]"
    >
      <img
        src={image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

      {type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-plaster/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FaPlay className="text-ink ml-1" size={18} />
          </span>
        </div>
      )}

      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-ink/70 backdrop-blur px-2.5 py-1 border border-plaster/20">
        <span className="font-mono text-[10px] text-bronze-light">{code}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-plaster/80">
          {label}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-heading text-plaster text-lg leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}
