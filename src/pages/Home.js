import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaBuilding, FaGlobe, FaTools, FaCouch, FaPencilRuler, FaComments } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import RatingBadge from "../components/RatingBadge";
import MediaCard from "../components/MediaCard";
import TestimonialsSection from "../components/TestimonialsSection";
import { CATEGORY_LABELS, CATEGORY_ORDER, WHY_US, SERVICES, FAQS, PROCESS_STEPS, STATS } from "../data/staticContent";

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
    <div className="border-b border-plaster/20 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 py-6 text-left hover:bg-ink-light/20 transition-colors px-1"
      >
        <span className="font-heading text-base sm:text-lg text-plaster font-semibold">{item.question}</span>
        <FaChevronDown
          className={`shrink-0 text-bronze transition-transform mt-1 ${isOpen ? "rotate-180" : ""}`}
          size={16}
        />
      </button>
      {isOpen && (
        <div className="pb-6 px-1">
          <p className="text-plaster/75 leading-relaxed text-sm sm:text-base">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

function StatsCarousel() {
  const [visibleStats, setVisibleStats] = useState(STATS);

  useEffect(() => {
    if (STATS.length < 2) return undefined;
    const id = setInterval(() => {
      setVisibleStats((prev) => [...prev.slice(1), prev[0]]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink/60 backdrop-blur-sm border-y border-plaster/10 overflow-hidden">
      <div className="flex animate-scroll gap-12 px-5 py-4">
        {[...visibleStats, ...visibleStats].map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 shrink-0 font-mono text-xs sm:text-sm text-plaster/70 whitespace-nowrap"
          >
            <span className="text-bronze">◆</span>
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);  // First FAQ open by default

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
              Design • Build • Furnish — Kenya • Uganda • South Sudan
            </p>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-semibold text-plaster leading-[1.05]">
              We Build It.
              <br />
              We Fit It.
              <br />
              <span className="text-bronze-light">We Finish It.</span>
            </h1>
            <p className="mt-6 text-plaster/70 text-base sm:text-lg max-w-2xl leading-relaxed">
              From structural steel and aluminium & glass facades to fully furnished interiors — Rateng delivers construction and design under one roof, across East Africa.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact">
                Request a Quote <FaArrowRight size={12} />
              </Button>
              <Button to="/portfolio" variant="outline">
                See Our Projects
              </Button>
            </div>
            <div className="mt-8">
              <RatingBadge dark />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Stat Cards */}
      <section className="bg-paper py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <div className="text-center">
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-bronze mb-1 sm:mb-2">12+</p>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-ink/60 leading-tight">Years in Operation</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-bronze mb-1 sm:mb-2">200+</p>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-ink/60 leading-tight">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-bronze mb-1 sm:mb-2">3</p>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-ink/60 leading-tight">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-bronze mb-1 sm:mb-2">4</p>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-ink/60 leading-tight">Specialist Divisions</p>
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
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <div
                key={service.key}
                className="group cursor-pointer rounded-lg overflow-hidden bg-white border border-ink/10 hover:shadow-lg transition-shadow"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-ink/5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-bronze text-ink font-heading font-bold text-sm px-3 py-1.5 rounded-full">
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col h-full">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-ink mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-ink/70 mb-4 flex-1 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-ink/5 text-ink/70 text-xs font-mono px-3 py-1 rounded border border-ink/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
              <SectionHeading eyebrow="Our Work" title="A portfolio built across borders" description="A sample of the design-build, fabrication and fit-out work delivered across the region." />
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

      {/* ----------------------------------------------- How We Work */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="From first call to handover"
            description="A straightforward process whether the job is a single steel gate or a full design-build contract."
            dark
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-heading text-4xl font-bold text-bronze">{step.number}</span>
                </div>
                <h3 className="font-heading text-lg text-plaster mb-2">{step.title}</h3>
                <p className="text-sm text-plaster/70 leading-relaxed">{step.description}</p>
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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, idx) => {
              const icons = [FaBuilding, FaGlobe, FaTools, FaCouch, FaPencilRuler, FaComments];
              const IconComponent = icons[idx % icons.length];
              return (
                <div
                  key={item.title}
                  className="border border-plaster/15 rounded-lg p-6 bg-ink-light/40 hover:border-bronze/40 transition-colors"
                >
                  <IconComponent className="text-bronze mb-4" size={24} />
                  <h3 className="font-heading text-lg text-plaster mb-2">{item.title}</h3>
                  <p className="text-sm text-plaster/70 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Testimonials */}
      <TestimonialsSection dark={false} />

      {/* ---------------------------------------------------------- FAQ */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Common Questions"
            title="Frequently Asked Questions"
            description="Get answers to common questions about our services, timelines, and service areas."
            dark
          />
          <div className="mt-16 space-y-0">
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