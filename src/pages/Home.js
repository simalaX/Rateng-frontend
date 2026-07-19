import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import client from "../api/client";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import RatingBadge from "../components/RatingBadge";
import MediaCard from "../components/MediaCard";
import TestimonialsSection from "../components/TestimonialsSection";
import { WHY_US, SERVICES, FAQS, PROCESS_STEPS } from "../data/staticContent";

function Button({ to, children, variant = "solid" }) {
  const base = "inline-flex items-center gap-3 px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300";
  const styles =
    variant === "solid"
      ? "bg-bronze text-ink hover:bg-bronze-light shadow-sm hover:shadow-md"
      : "border border-plaster/60 text-plaster hover:border-plaster hover:bg-plaster/8 hover:shadow-sm";
  return (
    <Link to={to} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-plaster/15 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 py-8 text-left hover:bg-ink-light/10 transition-all px-2"
      >
        <span className="font-serif text-lg sm:text-xl text-plaster font-light leading-relaxed">{item.question}</span>
        <FaChevronDown
          className={`shrink-0 text-bronze transition-transform mt-1 ${isOpen ? "rotate-180" : ""}`}
          size={16}
        />
      </button>
      {isOpen && (
        <div className="pb-8 px-2">
          <p className="text-plaster/70 leading-relaxed text-base font-light">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

function ServicesGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper py-32 sm:py-48 relative overflow-hidden">
      {/* Subtle luxury background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(215, 180, 105, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(100, 90, 80, 0.01) 0%, transparent 50%)'
      }} />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-20 sm:mb-28">
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-6">Services</p>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink font-light leading-tight mb-6">
            Four disciplines.<br />One vision.
          </h2>
          <p className="text-ink/70 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Every project draws on the same in-house team, ensuring design, fabrication, and finishing stay perfectly coordinated.
          </p>
        </div>

        {/* Service cards — with staggered bounce animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <div
              key={service.key}
              className="group flex flex-col cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 120}ms`,
              }}
            >
              <div className="relative h-56 overflow-hidden bg-ink/8 mb-6 border border-plaster/10 transition-all duration-500 group-hover:border-plaster/30">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 text-xs font-mono text-plaster/40">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-ink font-light mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed font-light">
                {service.description}
              </p>
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
        {/* Luxury gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(215, 180, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(100, 90, 80, 0.04) 0%, transparent 50%)'
          }}
        />

        {/* Premium hero image — full width */}
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=800&fit=crop&q=90")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/50 to-ink" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-40 pb-32 sm:pt-56 sm:pb-48">
          <div className="max-w-3xl">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-10 block">
              Kenya • Uganda • South Sudan
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-light text-plaster leading-[1.1] mb-10">
              We build,
              <br />
              we craft,
              <br />
              <span className="text-bronze-light">we finish.</span>
            </h1>
            <p className="text-plaster/70 text-lg sm:text-xl max-w-2xl leading-relaxed font-light mb-12">
              From structural steel and glass facades to fully furnished interiors. One team. One point of contact. Every project, end to end.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Button to="/contact">
                Get a Quote <FaArrowRight size={12} />
              </Button>
              <Button to="/portfolio" variant="outline">
                View Portfolio
              </Button>
            </div>
            <div className="mt-16">
              <RatingBadge dark />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Stats — Luxury Cards */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-serif text-5xl sm:text-6xl text-bronze font-light">12+</p>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/60">Years of Excellence</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-serif text-5xl sm:text-6xl text-bronze font-light">200+</p>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/60">Projects Delivered</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-serif text-5xl sm:text-6xl text-bronze font-light">3</p>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/60">Countries Served</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-serif text-5xl sm:text-6xl text-bronze font-light">4</p>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/60">Disciplines In-House</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <ServicesGrid />

      {/* --------------------------------------------------- Featured work */}
      {featured.length > 0 && (
        <section className="bg-paper py-32 sm:py-48">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="mb-20 sm:mb-28">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-6">Portfolio</p>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                <div>
                  <h2 className="font-serif text-5xl sm:text-6xl text-ink font-light mb-6 leading-tight">
                    Built across borders
                  </h2>
                  <p className="text-ink/60 text-base font-light max-w-xl">
                    A selection of design-build, fabrication and fit-out work delivered across Kenya, Uganda, and South Sudan.
                  </p>
                </div>
                <Link
                  to="/portfolio"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-bronze-dark hover:text-ink transition-colors flex items-center gap-3 shrink-0"
                >
                  Explore All <FaArrowRight size={11} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((item) => (
                <MediaCard key={item.id} item={item} type="image" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------- How We Work */}
      <section className="bg-ink py-32 sm:py-48 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(215, 180, 105, 0.3) 0%, transparent 50%)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-20 sm:mb-28">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-6">Process</p>
            <h2 className="font-serif text-5xl sm:text-6xl text-plaster font-light leading-tight">
              From first call<br />to handover
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col">
                <span className="font-serif text-6xl font-light text-bronze mb-4 block">{step.number}</span>
                <h3 className="font-serif text-xl text-plaster mb-4 font-light">{step.title}</h3>
                <p className="text-sm text-plaster/70 leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Why Us */}
      <section className="bg-paper py-32 sm:py-48">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-20 sm:mb-28">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-6">Why Rateng</p>
            <h2 className="font-serif text-5xl sm:text-6xl text-ink font-light leading-tight">
              Craftsmanship<br />
              that endures
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {WHY_US.slice(0, 3).map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                <h3 className="font-serif text-xl text-ink font-light">{item.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed font-light">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Testimonials */}
      <TestimonialsSection dark={false} />

      {/* ---------------------------------------------------------- FAQ */}
      <section className="bg-ink py-32 sm:py-48">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="mb-20 sm:mb-28">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-6">Questions</p>
            <h2 className="font-serif text-5xl sm:text-6xl text-plaster font-light">
              Asked often
            </h2>
          </div>
          <div className="space-y-0">
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
      <section className="bg-bronze py-32 sm:py-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10 text-center sm:text-left">
          <h2 className="font-serif text-4xl sm:text-5xl text-ink font-light leading-tight">
            Start your<br className="hidden sm:inline" /> next project
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-plaster font-mono text-xs uppercase tracking-[0.15em] hover:bg-ink-light transition-all duration-300 shadow-sm hover:shadow-md shrink-0"
          >
            Contact Us <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  );
}