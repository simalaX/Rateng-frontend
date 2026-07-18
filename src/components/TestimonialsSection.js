import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { TESTIMONIALS } from "../data/staticContent";

export default function TestimonialsSection({ dark = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!autoPlay || TESTIMONIALS.length < 2) return undefined;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [autoPlay]);

  if (TESTIMONIALS.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  const bgClass = dark ? "bg-ink" : "bg-paper";
  const textClass = dark ? "text-plaster" : "text-ink";
  const cardBgClass = dark ? "bg-ink-light/60" : "bg-white";
  const cardBorderClass = dark ? "border-plaster/15" : "border-ink/10";

  // Show 3 cards on desktop, 1 on mobile
  const visibleCards = 3;
  const displayCards = [];
  for (let i = 0; i < visibleCards; i++) {
    const idx = (currentIndex + i) % TESTIMONIALS.length;
    displayCards.push(TESTIMONIALS[idx]);
  }

  return (
    <div className={`w-full py-20 sm:py-28 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 uppercase ${textClass}`}>
          What Our Clients Say After Handover
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayCards.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`${cardBgClass} border ${cardBorderClass} rounded-lg p-6 sm:p-8 flex flex-col justify-between h-full transition-all hover:shadow-lg`}
            >
              {/* Quote */}
              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${dark ? "text-plaster/80" : "text-ink/80"}`}>
                "{testimonial.quote}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-current border-opacity-10 pt-6">
                {/* Avatar with initials */}
                <div className="w-12 h-12 rounded-lg bg-bronze/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-lg font-bold text-bronze">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                {/* Name and details */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-heading font-semibold ${textClass}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-xs ${dark ? "text-plaster/50" : "text-ink/50"}`}>
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={i < testimonial.rating ? "text-bronze" : `${dark ? "text-plaster/20" : "text-ink/20"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        {TESTIMONIALS.length > 1 && (
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className={`p-3 border rounded-full transition-colors ${dark
                  ? "border-plaster/30 text-plaster/70 hover:border-bronze hover:text-bronze-light bg-ink-light/40"
                  : "border-ink/30 text-ink/60 hover:border-bronze hover:text-bronze-dark bg-paper/40"
                }`}
            >
              <FaChevronLeft size={16} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(i);
                    setAutoPlay(false);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentIndex
                      ? "bg-bronze"
                      : dark
                        ? "bg-plaster/25 hover:bg-plaster/50"
                        : "bg-ink/20 hover:bg-ink/40"
                    }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={handleNext}
              className={`p-3 border rounded-full transition-colors ${dark
                  ? "border-plaster/30 text-plaster/70 hover:border-bronze hover:text-bronze-light bg-ink-light/40"
                  : "border-ink/30 text-ink/60 hover:border-bronze hover:text-bronze-dark bg-paper/40"
                }`}
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}