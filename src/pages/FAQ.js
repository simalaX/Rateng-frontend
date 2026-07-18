import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SEO from "../components/SEO";
import { FAQS } from "../data/staticContent";

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about Rateng Construction and Interiors — service areas, quotations, timelines, and more."
      />

      <section className="bg-ink bg-blueprint-grid">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-bronze-light mb-5">
            Questions
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold text-plaster leading-tight">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
