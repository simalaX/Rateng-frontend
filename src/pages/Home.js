import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import RatingBadge from "../components/RatingBadge";
import MediaCard from "../components/MediaCard";
import TestimonialsSection from "../components/TestimonialsSection";
import { CATEGORY_LABELS, CATEGORY_ORDER, WHY_US, SERVICES, FAQS } from "../data/staticContent";

function Button({ to, children, variant = "solid" }) {
  const base = "inline-flex items-center gap-2 px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors";
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

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-heading text-lg sm:text-xl text-ink">{item.question}</span>
        <FaChevronDown
          className={`shrink-0 text-bronze transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </button>
      {isOpen && (
        <p className="pb-6 text-ink/65 leading-relaxed max-w-3xl">{item.answer}</p>
      )}
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    let active = true;
    client
      .get("/api/gallery/", { params: { limit: 6 } })
      .then(({ data }) => {
        if (active) setFeatured(data.items);
      })
      .catch(() => {
        if (active) setFeatured([]);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SEO
        title={undefined}
        description="Architectural & structural design, steel fabrication, glass & aluminium, and interior fittings — countrywide construction across Nairobi and upcountry Kenya."
      />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="corner-ticks max-w-3xl py-2 animate-fade-up">
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-bronze-light mb-6">
              General Contractor &mdash; Nairobi &amp; Upcountry, Kenya
            </p>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-semibold text-plaster leading-[1.05]">
              Building Excellence.
              <br />
              <span className="text-bronze-light">Engineered for Life.</span>
            </h1>
            <p className="mt-6 text-plaster/70 text-base sm:text-lg max-w-xl leading-relaxed">
              From architectural design to steel fabrication, glass &amp; aluminium, and interior
              fit-out &mdash; Rateng Construction and Interiors delivers every trade under one
              roof.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact">
                Get a Free Quote <FaArrowRight size={12} />
              </Button>
              <Button to="/portfolio" variant="outline">
                View Our Work
              </Button>
            </div>
            <div className="mt-8">
              <RatingBadge dark />
            </div>
          </div>

          {/* Title-block style sheet index strip — signature motif */}
          <div className="mt-16 border border-plaster/15 bg-ink/40 backdrop-blur-sm animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-plaster/15">
              {CATEGORY_ORDER.map((key) => (
                <div key={key} className="px-5 py-4 flex items-center gap-3">
                  <span className="font-mono text-bronze text-lg">{CATEGORY_LABELS[key].code}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-plaster/70 leading-tight">
                    {CATEGORY_LABELS[key].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Four disciplines, one contractor"
            description="Every project draws on the same in-house team, so design, fabrication, and finishing stay coordinated."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {SERVICES.map((service) => (
              <div key={service.key} className="bg-paper p-7 flex flex-col">
                <span className="font-mono text-xs text-bronze-dark mb-3">
                  {CATEGORY_LABELS[service.key].code} &mdash; 01
                </span>
                <h3 className="font-heading text-xl text-ink mb-3">{service.title}</h3>
                <ul className="service-list text-sm text-ink/60 space-y-1.5 flex-1">
                  {service.items.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="mt-5 font-mono text-xs uppercase tracking-wider text-bronze-dark hover:text-ink inline-flex items-center gap-1.5"
                >
                  Full List <FaArrowRight size={10} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Why Us */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Rateng"
            title="Built on craftsmanship and follow-through"
            dark
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item) => (
              <div key={item.title} className="border-t border-bronze/30 pt-5">
                <h3 className="font-heading text-lg text-plaster mb-2">{item.title}</h3>
                <p className="text-sm text-plaster/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Featured work */}
      {featured.length > 0 && (
        <section className="bg-paper py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Recent Work" title="A look at our portfolio" />
              <Link
                to="/portfolio"
                className="font-mono text-xs uppercase tracking-widest text-bronze-dark hover:text-ink inline-flex items-center gap-2"
              >
                View Full Portfolio <FaArrowRight size={11} />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item) => (
                <MediaCard key={item.id} item={item} type="image" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------- Testimonials */}
      <section className="bg-ink py-20 sm:py-28 bg-blueprint-grid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <TestimonialsSection dark />
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently Asked Questions"
            description="Get answers to common questions about our services, timelines, and service areas."
          />
          <div className="mt-12">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openFaqIndex === i}
                onToggle={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA */}
      <section className="bg-bronze">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <h2 className="font-heading text-2xl sm:text-3xl text-ink font-semibold">
            Ready to start your project?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-plaster font-mono text-xs uppercase tracking-widest hover:bg-ink-light transition-colors shrink-0"
          >
            Contact Us <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  );
}
