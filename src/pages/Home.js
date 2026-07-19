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
  return (
    <section className="bg-paper py-14 sm:py-20 relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cg fill=%22%23000%22 opacity=%220.05%22%3E%3Cpath d=%22M0 0h20v20H0zm40 0h20v20H40zm40 0h20v20H80M0 40h20v20H0zm40 0h20v20H40zm40 0h20v20H80M0 80h20v20H0zm40 0h20v20H40zm40 0h20v20H80%22/%3E%3C/g%3E%3C/svg%3E")'
      }} />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Four disciplines, one contractor"
          description="Every project draws on the same in-house team, so design, fabrication, and finishing stay coordinated."
        />

        {/* Static grid — every service visible immediately, no click or slide required */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((service, idx) => (
            <div
              key={service.key}
              className="bg-white border border-ink/10 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="relative h-28 sm:h-40 overflow-hidden bg-ink/5">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-bronze text-ink font-heading font-bold text-xs px-2 py-0.5 rounded-full">
                  0{idx + 1}
                </div>
              </div>
              <div className="p-3.5 sm:p-5 flex flex-col flex-1">
                <h3 className="font-heading text-sm sm:text-base font-bold text-ink mb-1.5">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink/65 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
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
        {/* Background layers — construction/architecture themed */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-20" />

        {/* Subtle construction/building background image overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/60 to-ink" />

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
      <section className="bg-paper py-10 sm:py-16 relative">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cg fill=%22none%22 stroke=%22%23000%22 stroke-width=%220.5%22 opacity=%220.1%22%3E%3Cpath d=%22M0 0l200 200M200 0L0 200%22/%3E%3C/g%3E%3C/svg%3E")'
        }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
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
        <section className="bg-paper py-14 sm:py-20 relative">
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1553531889-e6cf3d1c3884?w=1200&h=600&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
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
      <section className="bg-ink py-14 sm:py-20 relative">
        <div className="absolute inset-0 bg-blueprint-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
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
      <section className="bg-ink py-14 sm:py-20 relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ctext x=%2220%22 y=%2250%22 font-size=%2240%22 fill=%22%23fff%22 opacity=%220.1%22%3E♦%3C/text%3E%3C/svg%3E")'
        }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
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