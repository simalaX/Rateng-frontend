import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { CATEGORY_LABELS, SERVICES } from "../data/staticContent";

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Construction, Steel Fabrication, Glass and Aluminium, and Interior Fittings — full service list for Rateng Construction and Interiors."
      />

      <section className="bg-ink bg-blueprint-grid">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-bronze-light mb-5">
            Sheet Index
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold text-plaster leading-tight">
            Our Services
          </h1>
          <p className="mt-5 text-plaster/70 max-w-2xl text-lg">
            Four disciplines under one contractor &mdash; from the first drawing to the final
            finish.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-20">
          {SERVICES.map((service) => (
            <div key={service.key} id={service.key} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-3xl text-bronze">
                  {CATEGORY_LABELS[service.key].code}
                </span>
                <div className="h-px flex-1 bg-ink/10" />
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl text-ink mb-4">{service.title}</h2>
              {service.tagline && (
                <p className="text-ink/60 text-lg leading-relaxed max-w-2xl mb-6 italic">
                  {service.tagline}
                </p>
              )}
              <ul className="service-list grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-ink/75 max-w-2xl">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bronze">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <h2 className="font-heading text-2xl sm:text-3xl text-ink font-semibold">
            Have a project in mind?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center px-7 py-3.5 bg-ink text-plaster font-mono text-xs uppercase tracking-widest hover:bg-ink-light transition-colors shrink-0"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
