import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import { SERVICES } from "../data/staticContent";

function Button({ to, children, variant = "solid" }) {
  const base = "inline-flex items-center gap-2 px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors rounded";
  const styles =
    variant === "solid"
      ? "bg-bronze text-ink hover:bg-bronze-light"
      : "border border-plaster/40 text-plaster hover:border-plaster hover:bg-plaster/5";
  return (
    <Link to={to} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function ServiceCard({ service, idx, isDisplayed }) {
  return (
    <div
      className={`transition-all duration-700 ease-out transform ${isDisplayed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
        }`}
    >
      <div className="rounded-lg overflow-hidden border border-ink/10 hover:shadow-lg transition-all bg-white h-full flex flex-col">
        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden bg-ink/5">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-bronze text-ink font-heading font-bold text-xs sm:text-sm px-2.5 py-1 rounded-full">
            0{idx + 1}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-heading text-base font-bold text-ink mb-2 line-clamp-2">
            {service.title}
          </h3>
          <p className="text-xs text-ink/70 leading-relaxed line-clamp-3 flex-1">
            {service.description}
          </p>
          <Link
            to="/services"
            className="mt-4 inline-flex items-center gap-2 text-bronze hover:text-bronze-light text-xs font-mono uppercase tracking-widest transition-colors"
          >
            Learn More <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandingHome() {
  const [displayedServices, setDisplayedServices] = useState([]);

  // Sequential service reveal
  useEffect(() => {
    let timeoutIds = [];
    SERVICES.forEach((_, idx) => {
      const timeoutId = setTimeout(() => {
        setDisplayedServices((prev) => [...prev, idx]);
      }, idx * 300);
      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, []);

  return (
    <>
      <SEO
        title={undefined}
        description="Architectural & structural design, steel fabrication, glass & aluminium, and interior fittings — countrywide construction across Nairobi and upcountry Kenya."
      />

      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-ink overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-blueprint-grid opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="max-w-3xl">
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-bronze-light mb-6 animate-fade-up">
              Design • Build • Furnish — Kenya • Uganda • South Sudan
            </p>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-semibold text-plaster leading-tight mb-6 animate-fade-up">
              We Build It.
              <br />
              We Fit It.
              <br />
              <span className="text-bronze-light">We Finish It.</span>
            </h1>

            <p className="text-plaster/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl animate-fade-up">
              Complete construction solutions from architectural design and steel fabrication to fully furnished interiors. One team. One roof. Across East Africa.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up">
              <Button to="/contact">
                Get Started <FaArrowRight size={12} />
              </Button>
              <Button to="/portfolio" variant="outline">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section Heading */}
          <div className="mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-bronze mb-4">What We Do</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mb-4">
              Four Disciplines,
              <br />
              One Contractor
            </h2>
            <p className="text-ink/70 text-base max-w-2xl">
              Every project draws on the same in-house team, so design, fabrication, and finishing stay coordinated.
            </p>
          </div>

          {/* Services Grid - Animated Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <ServiceCard
                key={service.key}
                service={service}
                idx={idx}
                isDisplayed={displayedServices.includes(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="bg-ink py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-heading text-4xl sm:text-5xl text-bronze mb-2">12+</p>
              <p className="font-mono text-xs uppercase tracking-widest text-plaster/60">Years in Business</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl sm:text-5xl text-bronze mb-2">200+</p>
              <p className="font-mono text-xs uppercase tracking-widest text-plaster/60">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl sm:text-5xl text-bronze mb-2">3</p>
              <p className="font-mono text-xs uppercase tracking-widest text-plaster/60">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl sm:text-5xl text-bronze mb-2">4.9★</p>
              <p className="font-mono text-xs uppercase tracking-widest text-plaster/60">Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="bg-bronze py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-ink font-semibold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-ink/80 text-base max-w-2xl mx-auto mb-8">
            Let's discuss your project. From concept to completion, we handle every detail.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-plaster font-mono text-xs uppercase tracking-widest hover:bg-ink-light transition-colors rounded"
          >
            Contact Us Today <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  );
}