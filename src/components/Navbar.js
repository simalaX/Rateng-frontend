import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaPhone, FaClock, FaSearch, FaChevronDown } from "react-icons/fa";
import { COMPANY } from "../data/staticContent";

const LINKS = [
  { to: "/", label: "Home" },
  {
    label: "Services",
    submenu: [
      { to: "/services#construction", label: "Construction — Design & Build" },
      { to: "/services#steel", label: "Steel Fabrication & Installation" },
      { to: "/services#aluminium", label: "Aluminium & Glass" },
      { to: "/services#interiors", label: "Interior Fittings" }
    ]
  },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "Why Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        navigate("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const linkClass = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-widest transition-colors ${isActive ? "text-bronze" : "text-plaster/80 hover:text-plaster"
    }`;

  return (
    <>
      {/* Top Contact & Info Bar — Improved Spacing */}
      <div className="bg-white border-b border-plaster/20 px-5 sm:px-8 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
          {/* Logo + Company Name Section */}
          <NavLink to="/" className="flex items-center gap-3 sm:gap-4 shrink-0">
            <img
              src="/rateng.png"
              alt="Rateng"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
            {/* Company Name — Now visible on desktop */}
            <div className="flex flex-col justify-center">
              <span className="font-heading text-sm sm:text-base md:text-lg text-ink font-bold leading-tight">
                {COMPANY.name}
              </span>
              <span className="font-mono text-xs text-ink/60 mt-0.5">
                Design • Build • Furnish
              </span>
            </div>
          </NavLink>

          {/* Center: Contact Info — Better Spacing */}
          <div className="hidden sm:flex items-center gap-8 md:gap-12 flex-1 justify-center">
            {/* Phone */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
                Call Us
              </span>
              <a
                href="tel:+254728977636"
                className="font-heading text-lg md:text-xl text-bronze hover:text-bronze-light transition-colors"
              >
                +254 728 977 636
              </a>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-ink/10" />

            {/* Working Hours */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
                Working Time
              </span>
              <span className="font-heading text-lg md:text-xl text-bronze whitespace-nowrap">
                Mon - Fri : 08:00 - 17:00
              </span>
            </div>
          </div>

          {/* Right: Search & Menu Toggle */}
          <div className="flex items-center gap-4 ml-auto sm:ml-0 shrink-0">
            <button className="text-ink p-2 hover:text-bronze transition-colors hidden sm:block">
              <FaSearch size={18} />
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="sm:hidden text-ink p-2"
            >
              {open ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Contact Info */}
        <div className="sm:hidden flex gap-4 mt-3 text-xs">
          <a href="tel:+254728977636" className="text-bronze font-heading hover:text-bronze-light">
            +254 728 977 636
          </a>
          <span className="text-ink/40">•</span>
          <span className="text-ink/70">Mon-Fri 08:00-17:00</span>
        </div>
      </div>

      {/* Main Navigation Bar — Better Spacing */}
      <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-plaster/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Desktop Navigation — More Breathing Room */}
          <nav className="hidden sm:flex items-center gap-1 flex-1">
            {LINKS.map((link) => {
              // If link has submenu (Services)
              if (link.submenu) {
                return (
                  <div key={link.label} className="relative group">
                    <button className={`font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 px-4 py-2 rounded text-plaster/80 hover:text-plaster hover:bg-ink-light/30`}>
                      {link.label}
                      <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-0 w-64 bg-ink border border-plaster/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-40">
                      {link.submenu.map((item) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className="block px-5 py-3 text-plaster/80 hover:text-bronze hover:bg-ink-light/40 text-xs font-mono uppercase tracking-widest transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              // Regular links
              return (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `${linkClass({ isActive })} px-4 py-2 rounded transition-all hover:bg-ink-light/20`} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="sm:hidden text-plaster p-2 ml-auto"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Menu — Better Spacing */}
        {open && (
          <nav className="sm:hidden bg-ink border-t border-plaster/10 px-5 py-6 flex flex-col gap-4">
            {LINKS.map((link) => {
              // Services with dropdown
              if (link.submenu) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="font-heading text-lg text-plaster hover:text-bronze flex items-center justify-between w-full py-2.5 transition-colors"
                    >
                      {link.label}
                      <FaChevronDown size={12} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="flex flex-col gap-2.5 mt-2 pl-4 border-l border-plaster/20">
                        {link.submenu.map((item) => (
                          <a
                            key={item.to}
                            href={item.to}
                            onClick={() => setOpen(false)}
                            className="font-mono text-xs uppercase tracking-widest text-plaster/70 hover:text-bronze py-1.5 transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular links
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-heading text-lg ${isActive ? "text-bronze" : "text-plaster hover:text-bronze"} transition-colors py-2`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              );
            })}
            <NavLink
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bronze-light border border-bronze/40 px-4 py-3 w-fit mt-2 rounded"
            >
              <FaUserShield size={14} />
              Admin Login
            </NavLink>
          </nav>
        )}
      </header>
    </>
  );
}