import { useState } from "react";
import { FaCheckCircle, FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import client from "../api/client";
import SEO from "../components/SEO";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import { COMPANY, CATEGORY_LABELS, CATEGORY_ORDER } from "../data/staticContent";

const EMPTY_FORM = { name: "", email: "", phone: "", service_interested: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await client.post("/api/inquiries/", form);
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.detail
          ? "Please check the form for errors and try again."
          : "Something went wrong. Please try WhatsApp or call us directly."
      );
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Rateng Construction and Interiors for a quote — call, WhatsApp, or send a message."
      />

      <section className="bg-ink bg-blueprint-grid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-bronze-light mb-5">
            Get In Touch
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold text-plaster leading-tight">
            Let&rsquo;s Build Something
          </h1>
          <p className="mt-5 text-plaster/70 max-w-2xl text-lg">
            Tell us about your project and we&rsquo;ll get back to you to arrange a site visit and
            quotation.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="border border-bronze/40 bg-bronze/5 p-8 flex flex-col items-start gap-3">
                <FaCheckCircle className="text-bronze" size={28} />
                <h2 className="font-heading text-2xl text-ink">Message sent</h2>
                <p className="text-ink/60">
                  Thanks for reaching out &mdash; we&rsquo;ll be in touch shortly. For anything
                  urgent, WhatsApp or call us directly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-mono text-xs uppercase tracking-wider text-bronze-dark hover:text-ink"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="service_interested" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service_interested"
                      name="service_interested"
                      value={form.service_interested}
                      onChange={handleChange}
                      className="w-full"
                    >
                      <option value="">General Inquiry</option>
                      {CATEGORY_ORDER.map((key) => (
                        <option key={key} value={key}>
                          {CATEGORY_LABELS[key].label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {status === "error" && <p className="text-sm text-red-700">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3.5 bg-ink text-plaster font-mono text-xs uppercase tracking-widest hover:bg-ink-light transition-colors disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info + map */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-ink/80 hover:text-ink">
                <span className="w-10 h-10 flex items-center justify-center border border-ink/15 text-bronze-dark">
                  <FaPhoneAlt size={14} />
                </span>
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink/80 hover:text-ink"
              >
                <span className="w-10 h-10 flex items-center justify-center border border-ink/15 text-bronze-dark">
                  <FaWhatsapp size={16} />
                </span>
                WhatsApp Us
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-ink/80 hover:text-ink">
                <span className="w-10 h-10 flex items-center justify-center border border-ink/15 text-bronze-dark">
                  <FaEnvelope size={14} />
                </span>
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink/80 hover:text-ink"
              >
                <span className="w-10 h-10 flex items-center justify-center border border-ink/15 text-bronze-dark">
                  <FaInstagram size={16} />
                </span>
                @rateng_ke
              </a>
              <a
                href={COMPANY.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink/80 hover:text-ink"
              >
                <span className="w-10 h-10 flex items-center justify-center border border-ink/15 text-bronze-dark">
                  <SiTiktok size={14} />
                </span>
                Find us on TikTok
              </a>
            </div>

            <div className="border border-ink/10">
              <GoogleMapEmbed />
            </div>
            <p className="text-xs text-ink/40">
              Serving {COMPANY.serviceArea}. Map shows the general Nairobi area &mdash; contact us
              directly for our exact office location.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
