import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaPhone, FaClock } from "react-icons/fa";
import { COMPANY } from "../data/staticContent";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "Why Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
      {/* Top Contact Bar */}
      <div className="bg-ink border-b border-plaster/10 px-5 sm:px-8 py-2.5 text-plaster/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <a
            href="tel:+254728977636"
            className="flex items-center gap-2 text-bronze hover:text-bronze-light transition-colors font-mono"
          >
            <FaPhone size={14} />
            +254 728 977 636
          </a>
          <div className="flex items-center gap-2 text-plaster/60 font-mono">
            <FaClock size={14} />
            Mon - Fri : 08:00 - 17:00
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-plaster/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-24 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
            <img src="/rateng.png" alt="" className="w-16 h-16 sm:w-20 sm:h-20" />
            <span className="font-heading text-lg sm:text-xl md:text-2xl text-plaster leading-tight">
              {COMPANY.shortName}
              <span className="hidden sm:inline text-plaster/60 font-body text-xs align-middle ml-2">
                Construction &amp; Interiors
              </span>
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden text-plaster p-2"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden bg-ink border-t border-plaster/10 px-5 py-6 flex flex-col gap-5">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-heading text-2xl ${isActive ? "text-bronze" : "text-plaster"}`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bronze-light border border-bronze/40 px-3 py-3 w-fit mt-2"
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