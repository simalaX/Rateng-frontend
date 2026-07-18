import { COMPANY } from "../data/staticContent";

// Uses the key-free "output=embed" Google Maps trick, so no API key /
// billing account is required. Update REACT_APP_MAP_QUERY (or
// COMPANY.mapQuery) with your exact business address once confirmed,
// for a precise pin instead of a general area.
export default function GoogleMapEmbed({ className = "" }) {
  const query = encodeURIComponent(process.env.REACT_APP_MAP_QUERY || COMPANY.mapQuery);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className={`w-full h-full min-h-[280px] bg-ink/5 ${className}`}>
      <iframe
        title="Rateng Construction and Interiors location"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 280 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
