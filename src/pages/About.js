import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import { WHY_US, COMPANY } from "../data/staticContent";

export default function About() {
  return (
    <>
      <SEO
        title="Why Us"
        description="Why choose Rateng Construction and Interiors for your next construction, steel fabrication, glass and aluminium, or interior fitting project."
      />

      <section className="bg-ink bg-blueprint-grid">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-bronze-light mb-5">
            About Us
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold text-plaster leading-tight">
            Why Rateng
          </h1>
          <p className="mt-6 text-plaster/70 max-w-2xl text-lg leading-relaxed">
            Rateng Construction and Interiors brings architectural design, structural engineering,
            steel fabrication, glass &amp; aluminium, and interior finishing together under one
            team &mdash; delivering full turnkey projects across {COMPANY.serviceArea}.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="What working with us looks like"
            description="A single point of contact, transparent scoping, and trades that are used to working together on the same project."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {WHY_US.map((item, i) => (
              <div key={item.title}>
                <span className="font-mono text-3xl text-bronze/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl text-ink mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bronze">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <h2 className="font-heading text-2xl sm:text-3xl text-ink font-semibold">
            Let&rsquo;s talk about your project
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center px-7 py-3.5 bg-ink text-plaster font-mono text-xs uppercase tracking-widest hover:bg-ink-light transition-colors shrink-0"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
