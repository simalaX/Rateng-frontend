import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

// Rotating brand statements — written in Rateng's own voice, not
// attributed to any customer, so there's no fake-review problem. Edit
// freely. Swap in real client testimonials later (see the previous
// version of this file) once you've collected some — just add
// client_name/rating back in and this will need a small tweak to render
// them again.
const STATEMENTS = [
  "Every steel gate, glass installation, and finished interior we deliver is built to one standard: safe, durable, and made to last.",
  "From architectural design to the final coat of paint, one in-house team sees every project through \u2014 no subcontractor guesswork.",
  "Countrywide construction, steel fabrication, glass and aluminium, and interior fittings \u2014 under one roof, done right.",
];

export default function TestimonialsSection({ dark = true }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (STATEMENTS.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STATEMENTS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  if (STATEMENTS.length === 0) return null;

  const textColor = dark ? "text-plaster" : "text-ink";

  return (
    <div className="max-w-3xl mx-auto text-center">
      <FaQuoteLeft className="mx-auto mb-6 text-bronze" size={28} />
      <p className={`font-heading text-xl sm:text-2xl md:text-3xl leading-relaxed ${textColor}`}>
        {STATEMENTS[index]}
      </p>

      {STATEMENTS.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setIndex((i) => (i - 1 + STATEMENTS.length) % STATEMENTS.length)}
            className={`p-2 border rounded-full transition-colors ${dark
                ? "border-plaster/20 text-plaster/70 hover:border-bronze hover:text-bronze-light"
                : "border-ink/20 text-ink/60 hover:border-bronze hover:text-bronze-dark"
              }`}
          >
            <FaChevronLeft size={14} />
          </button>
          <div className="flex gap-1.5">
            {STATEMENTS.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-bronze" : dark ? "bg-plaster/25" : "bg-ink/20"
                  }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setIndex((i) => (i + 1) % STATEMENTS.length)}
            className={`p-2 border rounded-full transition-colors ${dark
                ? "border-plaster/20 text-plaster/70 hover:border-bronze hover:text-bronze-light"
                : "border-ink/20 text-ink/60 hover:border-bronze hover:text-bronze-dark"
              }`}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}