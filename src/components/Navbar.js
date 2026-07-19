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
      {/* Top Contact & Info Bar */}
      <div className="bg-paper border-b border-plaster/20 px-5 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
          {/* Logo - Larger */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0">
            <img src="/rateng.png" alt="Rateng" className="w-14 h-14 sm:w-16 sm:h-16" />
          </NavLink>

          {/* Center: Contact Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 flex-1 sm:justify-center">
            {/* Phone */}
            <div className="flex items-start sm:items-center gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/60 leading-tight">
                  Call Us
                </span>
                <a
                  href="tel:+254728977636"
                  className="font-heading text-lg sm:text-xl text-bronze hover:text-bronze-light transition-colors"
                >
                  +254 728 977 636
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start sm:items-center gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/60 leading-tight">
                  Working Time
                </span>
                <span className="font-heading text-lg sm:text-xl text-bronze">
                  Mon - Fri : 08:00 - 17:00
                </span>
              </div>
            </div>
          </div>

          {/* Right: Search & Menu Toggle */}
          <div className="flex items-center gap-4 ml-auto sm:ml-0">
            <button className="text-ink p-2 hover:text-bronze transition-colors">
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
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-plaster/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-2 flex-1">
            {LINKS.map((link) => {
              // If link has submenu (Services)
              if (link.submenu) {
                return (
                  <div key={link.label} className="relative group">
                    <button className={`font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1 px-3 py-2 rounded text-plaster/80 hover:text-plaster group-hover:bg-ink-light/20`}>
                      {link.label}
                      <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-0 w-56 bg-ink border border-plaster/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-40">
                      {link.submenu.map((item) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className="block px-4 py-2.5 text-plaster/80 hover:text-bronze hover:bg-ink-light/30 text-sm font-mono uppercase tracking-widest transition-colors"
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
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
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

        {/* Mobile Navigation Menu */}
        {open && (
          <nav className="sm:hidden bg-ink border-t border-plaster/10 px-5 py-6 flex flex-col gap-3">
            {LINKS.map((link) => {
              // Services with dropdown
              if (link.submenu) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="font-heading text-lg text-plaster hover:text-bronze flex items-center justify-between w-full py-2 transition-colors"
                    >
                      {link.label}
                      <FaChevronDown size={12} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="flex flex-col gap-2 mt-2 pl-4 border-l border-plaster/20">
                        {link.submenu.map((item) => (
                          <a
                            key={item.to}
                            href={item.to}
                            onClick={() => setOpen(false)}
                            className="font-mono text-xs uppercase tracking-widest text-plaster/70 hover:text-bronze py-1 transition-colors"
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
                    `font-heading text-lg ${isActive ? "text-bronze" : "text-plaster hover:text-bronze"} transition-colors`
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
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bronze-light border border-bronze/40 px-3 py-3 w-fit mt-2 rounded"
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