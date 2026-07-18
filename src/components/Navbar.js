import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
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

  // Close the mobile menu on route change (NavLink click) automatically
  // via key reset isn't needed since we close explicitly on click below.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Listen for Ctrl+Shift+A keyboard shortcut to navigate to admin
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
    <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-plaster/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img src="/rateng.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14" />
          <span className="font-heading text-base sm:text-lg md:text-xl text-plaster leading-tight">
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
  );
}