import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaBuilding, FaGlobe, FaTools, FaCouch, FaPencilRuler, FaComments } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import RatingBadge from "../components/RatingBadge";
import MediaCard from "../components/MediaCard";
import TestimonialsSection from "../components/TestimonialsSection";
import { WHY_US, SERVICES, FAQS, PROCESS_STEPS } from "../data/staticContent";

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

function ServicesGrid() {
  const [selectedService, setSelectedService] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");
  const service = SERVICES[selectedService];

  const handleSelectService = (idx) => {
    setSlideDirection(idx > selectedService ? "right" : "left");
    setSelectedService(idx);
    setDetailsOpen(false);
  };

  return (
    <section className="bg-paper py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Four disciplines, one contractor"
          description="Every project draws on the same in-house team, so design, fabrication, and finishing stay coordinated."
        />

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {SERVICES.map((item, idx) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelectService(idx)}
                style={{ animationDelay: `${idx * 90}ms` }}
                className={`service-tab flex-shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition ${selectedService === idx
                  ? "bg-bronze text-ink border-bronze"
                  : "bg-white/90 text-ink/75 border-ink/10 hover:bg-ink-light/70 hover:text-plaster"
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div
            key={`${service.key}-${slideDirection}`}
            className={`grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-stretch ${slideDirection === "right" ? "animate-slide-right" : "animate-slide-left"
              }`}
          >
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
              <div className="relative h-72 sm:h-96">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-bronze px-3 py-1 text-xs font-heading font-bold text-ink">
                  0{selectedService + 1}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">Selected service</p>
                <h3 className="font-heading text-2xl text-ink font-semibold mb-3">{service.title}</h3>
                {service.tagline && <p className="text-sm text-bronze mb-4">{service.tagline}</p>}
                <p className="text-sm sm:text-base text-ink/75 leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink/5 px-3 py-1 text-xs uppercase tracking-widest text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setDetailsOpen((v) => !v)}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-bronze bg-bronze/10 px-4 py-3 text-sm uppercase tracking-widest text-bronze hover:bg-bronze/15 transition"
                >
                  {detailsOpen ? "Hide details" : "View details"}
                </button>

                {detailsOpen && (
                  <div className="rounded-2xl border border-ink/10 bg-ink-light/20 p-4">
                    <p className="font-heading text-sm uppercase tracking-widest text-ink/80 mb-3">More information</p>
                    <ul className="grid gap-2 text-sm text-ink/75">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-bronze flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <section className="bg-paper py-10 sm:py-16">
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
      <ServicesGrid />

      {/* --------------------------------------------------- Featured work */}
      {featured.length > 0 && (
        <section className="bg-paper py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10">
              <SectionHeading eyebrow="Our Work" title="A portfolio built across borders" description="A sample of the design-build, fabrication and fit-out work delivered across the region." />
              <Link
                to="/portfolio"
                className="font-mono text-xs uppercase tracking-widest text-bronze-dark hover:text-ink inline-flex items-center gap-2 shrink-0"
              >
                View Full Portfolio <FaArrowRight size={11} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {featured.map((item) => (
                <MediaCard key={item.id} item={item} type="image" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------- How We Work */}
      <section className="bg-ink py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="From first call to handover"
            description="A straightforward process whether the job is a single steel gate or a full design-build contract."
            dark
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col">
                <span className="font-heading text-4xl font-bold text-bronze mb-2 block">{step.number}</span>
                <h3 className="font-heading text-lg text-plaster mb-2">{step.title}</h3>
                <p className="text-sm text-plaster/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Why Us */}
      <section className="bg-ink py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Rateng"
            title="Built on craftsmanship and follow-through"
            dark
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WHY_US.slice(0, 3).map((item, idx) => {
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
      <section className="bg-ink py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Common Questions"
            title="Frequently Asked Questions"
            description="Get answers to common questions about our services, timelines, and service areas."
            dark
          />
          <div className="mt-12 space-y-0">
            {FAQS.slice(0, 4).map((item, i) => (
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
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