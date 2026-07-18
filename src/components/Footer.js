import { NavLink } from "react-router-dom";
import { FaInstagram, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { COMPANY, CATEGORY_LABELS, CATEGORY_ORDER } from "../data/staticContent";
import RatingBadge from "./RatingBadge";

export default function Footer() {

  return (
    <footer className="bg-ink text-plaster border-t border-bronze/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/rateng.png" alt="" className="w-9 h-9" />
            <span className="font-heading text-lg">{COMPANY.name}</span>
          </div>
          <p className="text-plaster/60 text-sm leading-relaxed">
            Construction, steel fabrication, glass &amp; aluminium, and interior fittings —
            delivered across {COMPANY.serviceArea}.
          </p>
          <div className="mt-4">
            <RatingBadge dark />
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-light mb-4">
            Sheet Index — Services
          </p>
          <ul className="space-y-2 text-sm text-plaster/70">
            {CATEGORY_ORDER.map((key) => (
              <li key={key} className="flex items-center gap-2">
                <span className="font-mono text-bronze text-xs">{CATEGORY_LABELS[key].code}</span>
                <NavLink to="/services" className="hover:text-plaster transition-colors">
                  {CATEGORY_LABELS[key].label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-light mb-4">
            Company
          </p>
          <ul className="space-y-2 text-sm text-plaster/70">
            <li>
              <NavLink to="/portfolio" className="hover:text-plaster transition-colors">
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-plaster transition-colors">
                Why Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="hover:text-plaster transition-colors">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="hover:text-plaster transition-colors">
                Terms &amp; Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy" className="hover:text-plaster transition-colors">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-light mb-4">
            Get In Touch
          </p>
          <ul className="space-y-3 text-sm text-plaster/70">
            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 hover:text-plaster transition-colors"
              >
                <FaPhoneAlt size={13} /> {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${COMPANY.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-plaster transition-colors"
              >
                <FaWhatsapp size={14} /> WhatsApp Us
              </a>
            </li>
            <li>
              <a
                href={COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-plaster transition-colors"
              >
                <FaInstagram size={14} /> Instagram
              </a>
            </li>
            <li>
              <a
                href={COMPANY.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-plaster transition-colors"
              >
                <SiTiktok size={13} /> TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-plaster/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-plaster/40 font-mono">
          <span>
            &copy; 2026 Rateng Construction and Interiors. All rights reserved. | Website by Simala Watts
          </span>
        </div>
      </div>
    </footer>
  );
}
