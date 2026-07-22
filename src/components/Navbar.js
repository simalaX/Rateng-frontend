import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaChevronDown } from "react-icons/fa";
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

  return (
    <>
      {/* Premium Header — Minimal and clean */}
      <div className="bg-white border-b border-ink/8 px-5 sm:px-8 py-6 sm:py-7">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Logo + Brand Name */}
          <NavLink to="/" className="flex items-center gap-4 shrink-0">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-ink/5 p-3 shadow-soft">
              <img
                src="/rateng.png"
                alt="Rateng"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-base sm:text-lg text-ink font-light leading-tight">
                {COMPANY.shortName}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-ink/50 mt-1 tracking-widest">
                CONSTRUCTION & INTERIORS
              </span>
            </div>
          </NavLink>

          {/* Desktop Contact Info — Right Aligned */}
          <div className="hidden sm:flex items-center gap-12 flex-1 justify-end">
            <a
              href="tel:+254728977636"
              className="flex flex-col gap-1 group cursor-pointer"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">Call</span>
              <span className="font-serif text-lg font-light text-ink group-hover:text-bronze transition-colors">
                +254 728 977 636
              </span>
            </a>

            <div className="w-px h-8 bg-ink/8" />

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">Hours</span>
              <span className="font-serif text-sm font-light text-ink whitespace-nowrap">
                Mon–Fri, 08:00–17:00
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="sm:hidden text-ink p-2 ml-auto"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Contact Info */}
        <div className="sm:hidden flex gap-4 mt-4 text-xs border-t border-ink/8 pt-4">
          <a href="tel:+254728977636" className="text-bronze font-mono tracking-wider hover:text-bronze-light">
            +254 728 977 636
          </a>
          <span className="text-ink/20">•</span>
          <span className="text-ink/60 font-mono">Mon–Sat 08:00–17:00</span>
        </div>
      </div>

      {/* Main Navigation — Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-ink/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-8 flex-1">
            {LINKS.map((link) => {
              if (link.submenu) {
                return (
                  <div key={link.label} className="relative group">
                    <button className="font-serif text-sm text-ink/80 hover:text-ink transition-colors flex items-center gap-1 py-2 group-hover:text-bronze">
                      {link.label}
                      <FaChevronDown size={9} className="group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 w-60 bg-white border border-ink/8 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4 z-40">
                      {link.submenu.map((item) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className="block px-5 py-2.5 text-ink/70 hover:text-bronze hover:bg-ink/4 font-serif text-sm font-light transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-serif text-sm transition-colors ${isActive ? "text-bronze font-normal" : "text-ink/80 hover:text-ink font-light"}`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden text-ink p-2 ml-auto"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <nav className="sm:hidden bg-white border-t border-ink/8 px-5 py-6 flex flex-col gap-5">
            {LINKS.map((link) => {
              if (link.submenu) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="font-serif text-base text-ink hover:text-bronze flex items-center justify-between w-full py-2 transition-colors"
                    >
                      {link.label}
                      <FaChevronDown size={11} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="flex flex-col gap-3 mt-3 pl-4 border-l border-ink/8">
                        {link.submenu.map((item) => (
                          <a
                            key={item.to}
                            href={item.to}
                            onClick={() => setOpen(false)}
                            className="font-serif text-sm text-ink/70 hover:text-bronze py-1 transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-serif text-base ${isActive ? "text-bronze" : "text-ink/80 hover:text-ink"} transition-colors`
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
              className="flex items-center gap-2 font-serif text-xs text-bronze border border-bronze/40 px-4 py-3 w-fit mt-3 rounded-sm hover:bg-bronze/5 transition-colors"
            >
              <FaUserShield size={12} />
              Admin
            </NavLink>
          </nav>
        )}
      </header>
    </>
  );
}