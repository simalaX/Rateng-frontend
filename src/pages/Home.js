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

// Hero Carousel Component with Service Names
function HeroCarousel({ featured }) {
  useEffect(() => {
    if (featured.length > 0) {
      console.log('HeroCarousel featured items:', featured);
      featured.forEach((item, idx) => {
        console.log(`Item ${idx} image URL:`, item.image_url || item.url || item.file_url || item.image);
      });
    }
  }, [featured]);

  // Use SERVICES for sliding names (4 items)
  const servicesForSlide = SERVICES.slice(0, 4);
  const slideDuration = servicesForSlide.length * 6;

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* Background carousel - featured images */}
      <div className="flex h-full animate-carousel-slide" style={{ animationDuration: featured.length > 0 ? `${featured.length * 6}s` : '20s' }}>
        {featured.length > 0 ? (
          featured.map((item) => (
            <div
              key={item.id}
              className="min-w-full h-full relative flex-shrink-0"
            >
              <img
                src={item.image_url || item.url || item.file_url || item.image}
                alt={item.title || 'Portfolio'}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          ))
        ) : (
          <div className="min-w-full h-full bg-gradient-to-br from-ink via-ink-light to-ink flex-shrink-0" />
        )}
      </div>

      {/* Service names overlay - sliding */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex h-full" style={{ animation: `carousel-slide linear infinite`, animationDuration: `${slideDuration}s` }}>
          {servicesForSlide.map((service) => (
            <div
              key={service.key}
              className="min-w-full h-full flex items-center justify-end pr-20 sm:pr-32 flex-shrink-0"
            >
              <div className="text-right">
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-bronze font-light leading-tight drop-shadow-lg">
                  {service.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Fire blaze styles
const fireStyles = `
@keyframes carousel-slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-carousel-slide {
  animation: carousel-slide linear infinite;
}

@keyframes fireBlaze {
  0% {
    background-position: 200% center;
    opacity: 0;
    filter: blur(2px);
  }
  30% {
    opacity: 1;
  }
  100% {
    background-position: -200% center;
    opacity: 1;
    filter: blur(0px);
  }
}

@keyframes fireBurn {
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes serviceSlideInSequence {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes fireBurnSequential {
  0% {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  80% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    clip-path: inset(0 0 0 100%);
    opacity: 0;
  }
}

.fire-text {
  background: linear-gradient(90deg, 
    #ff6b1b 0%,
    #ff8c1b 25%,
    #ffa500 50%,
    #ff8c1b 75%,
    #ff6b1b 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 27, 0.5);
  filter: drop-shadow(0 0 15px rgba(255, 107, 27, 0.6)) drop-shadow(0 0 25px rgba(255, 165, 0, 0.3));
}

.fire-text--animated {
  animation: fireBurn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
             fireBlaze 1.2s ease-in-out forwards;
}

.fire-text--hero-delay-1 {
  animation-delay: 0s;
}

.fire-text--hero-delay-2 {
  animation-delay: 0.3s;
}

.fire-text--hero-delay-3 {
  animation-delay: 0.6s;
}

.fire-text--delay-location {
  animation-delay: 1.2s;
}

.service-title--fire {
  display: inline-block;
  background: linear-gradient(90deg, 
    #ff6b1b 0%,
    #ff8c1b 25%,
    #ffa500 50%,
    #ff8c1b 75%,
    #ff6b1b 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 27, 0.5);
  filter: drop-shadow(0 0 15px rgba(255, 107, 27, 0.6)) drop-shadow(0 0 25px rgba(255, 165, 0, 0.3));
}
`;

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
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalDuration = SERVICES.length * 3.5; // Total time for all services (each gets 3.5s)

  return (
    <section className="bg-paper py-32 sm:py-48 relative overflow-hidden">
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

        {/* Sequential Service Slide-In Animation - Infinite Loop */}
        <style>{`
          ${SERVICES.map((service, idx) => {
          const startTime = idx * 3.5;
          return `
              @keyframes serviceSlide${idx} {
                0%, ${(startTime / totalDuration) * 100}% {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                ${((startTime + 0.15) / totalDuration) * 100}% {
                  opacity: 1;
                }
                ${((startTime + 1.2) / totalDuration) * 100}%, ${((startTime + 2.3) / totalDuration) * 100}% {
                  transform: translateX(0);
                  opacity: 1;
                }
                ${((startTime + 3.5) / totalDuration) * 100}% {
                  transform: translateX(100%);
                  opacity: 0;
                }
                100% {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }

              @keyframes fireBurn${idx} {
                0%, ${(startTime / totalDuration) * 100}% {
                  clip-path: inset(0 100% 0 0);
                }
                ${((startTime + 0.15) / totalDuration) * 100}% {
                  clip-path: inset(0 100% 0 0);
                }
                ${((startTime + 1.0) / totalDuration) * 100}%, ${((startTime + 2.0) / totalDuration) * 100}% {
                  clip-path: inset(0 0 0 0);
                }
                ${((startTime + 3.5) / totalDuration) * 100}% {
                  clip-path: inset(0 0 0 100%);
                }
                100% {
                  clip-path: inset(0 0 0 100%);
                }
              }
            `;
        }).join('')}
        `}</style>

        <div ref={gridRef} className="relative min-h-96 overflow-hidden">
          {SERVICES.map((service, idx) => (
            <div
              key={service.key}
              style={{
                animation: isVisible ? `serviceSlide${idx} ${totalDuration}s linear infinite` : 'none',
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
              }}
            >
              <div className="group flex flex-col">
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
                <h3
                  className="font-serif text-lg sm:text-xl text-ink font-light mb-3 leading-tight service-title--fire"
                  style={{
                    animation: isVisible ? `fireBurn${idx} ${totalDuration}s linear infinite` : 'none',
                  }}
                >
                  {service.title}
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-light">
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
  const [portfolioFilter, setPortfolioFilter] = useState('all'); // 'all', 'photos', 'videos'

  useEffect(() => {
    let active = true;
    client
      .get("/api/gallery/")
      .then(({ data }) => {
        if (active) {
          setFeatured(data.items);
          console.log('Gallery API Response:', data);
          console.log('Featured items loaded:', data.items);
          if (data.items.length > 0) {
            console.log('First item full:', JSON.stringify(data.items[0], null, 2));
            console.log('First item keys:', Object.keys(data.items[0]));
          }
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Gallery API error:', err);
          setFeatured([]);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // Filter featured items based on selected filter - comprehensive video detection
  const filteredFeatured = featured.filter((item) => {
    if (portfolioFilter === 'all') return true;

    // More comprehensive video detection - check all possible properties
    const isVideo =
      // Direct type checks
      item.type === 'video' ||
      item.media_type === 'video' ||
      item.contentType === 'video' ||
      item.category === 'video' ||
      item.kind === 'video' ||

      // MIME type checks
      item.mime_type?.toLowerCase().includes('video') ||
      item.mimeType?.toLowerCase().includes('video') ||
      item.content_type?.toLowerCase().includes('video') ||

      // URL/file extension checks - check both url and file_url
      item.url?.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv|m4v|flv|wmv|3gp)$/i) ||
      item.file_url?.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv|m4v|flv|wmv|3gp)$/i) ||
      item.path?.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv|m4v|flv|wmv|3gp)$/i) ||
      item.filepath?.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv|m4v|flv|wmv|3gp)$/i) ||

      // Filename checks
      item.name?.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv|m4v|flv|wmv|3gp)$/i) ||
      item.filename?.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv|m4v|flv|wmv|3gp)$/i) ||

      // Check if title indicates video
      item.title?.toLowerCase().includes('video') ||
      item.title?.toLowerCase().includes('film');

    if (portfolioFilter === 'photos') return !isVideo;
    if (portfolioFilter === 'videos') return isVideo;
    return true;
  });

  return (
    <>
      <style>{fireStyles}</style>
      <SEO
        title={undefined}
        description="Architectural & structural design, steel fabrication, glass & aluminium, and interior fittings — countrywide construction across Nairobi and upcountry Kenya."
      />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative bg-ink overflow-hidden">
        {/* Carousel with portfolio images */}
        <HeroCarousel featured={featured} />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-40 pb-32 sm:pt-56 sm:pb-48">
          <div className="max-w-3xl">
            <p className={`font-mono text-xs sm:text-sm tracking-[0.2em] uppercase fire-text fire-text--animated fire-text--delay-location mb-10 block`}>
              Kenya • Uganda • South Sudan
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] mb-10">
              <span className="fire-text fire-text--animated fire-text--hero-delay-1">We Design, Build and Furnish.</span>
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
      <section className="bg-paper py-32 sm:py-48">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-20 sm:mb-28">
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-bronze-light mb-6">Portfolio</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
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

            {/* Portfolio Filter Tabs */}
            {featured.length > 0 && (
              <div className="flex gap-6 mb-12 border-b border-plaster/20 pb-4">
                <button
                  onClick={() => setPortfolioFilter('all')}
                  className={`font-mono text-xs uppercase tracking-[0.15em] pb-3 border-b-2 transition-all ${portfolioFilter === 'all'
                    ? 'text-ink border-bronze'
                    : 'text-ink/60 border-transparent hover:text-ink'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setPortfolioFilter('photos')}
                  className={`font-mono text-xs uppercase tracking-[0.15em] pb-3 border-b-2 transition-all ${portfolioFilter === 'photos'
                    ? 'text-ink border-bronze'
                    : 'text-ink/60 border-transparent hover:text-ink'
                    }`}
                >
                  Photos
                </button>
                <button
                  onClick={() => setPortfolioFilter('videos')}
                  className={`font-mono text-xs uppercase tracking-[0.15em] pb-3 border-b-2 transition-all ${portfolioFilter === 'videos'
                    ? 'text-ink border-bronze'
                    : 'text-ink/60 border-transparent hover:text-ink'
                    }`}
                >
                  Videos
                </button>
              </div>
            )}
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-8">
              {filteredFeatured.length > 0 ? (
                filteredFeatured.map((item) => (
                  <MediaCard key={item.id} item={item} type={item.type || 'image'} />
                ))
              ) : (
                <p className="text-ink/60 text-base font-light col-span-full text-center py-12">
                  No {portfolioFilter} found.
                </p>
              )}
            </div>
          ) : (
            <p className="text-ink/60 text-base font-light text-center py-12">
              Loading portfolio...
            </p>
          )}
        </div>
      </section>

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