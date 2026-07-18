import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCog,
  FaEnvelopeOpenText,
  FaImages,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import client from "../../api/client";

const LINKS = [
  { to: "/admin", label: "Overview", icon: FaTachometerAlt, end: true },
  { to: "/admin/media", label: "Gallery & Videos", icon: FaImages },
  { to: "/admin/inquiries", label: "Inquiries", icon: FaEnvelopeOpenText },
  { to: "/admin/settings", label: "Settings", icon: FaCog },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let active = true;
    client
      .get("/api/inquiries/", { params: { limit: 1 } })
      .then(({ data }) => {
        if (active) setUnread(data.unread);
      })
      .catch(() => { });
    return () => {
      active = false;
    };
  }, []);

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-6 py-6 border-b border-plaster/10">
        <img src="/rateng.png" alt="" className="w-8 h-8" />
        <span className="font-heading text-plaster text-lg">Admin</span>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${isActive
                ? "bg-bronze/15 text-bronze-light border-l-2 border-bronze"
                : "text-plaster/60 hover:text-plaster hover:bg-plaster/5 border-l-2 border-transparent"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Icon size={14} />
              {label}
            </span>
            {label === "Inquiries" && unread > 0 && (
              <span className="bg-bronze text-ink text-[10px] font-sans font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unread}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-6 border-t border-plaster/10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-wider text-plaster/60 hover:text-plaster hover:bg-plaster/5 transition-colors"
        >
          <FaSignOutAlt size={14} /> Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-ink shrink-0">{sidebarContent}</aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-ink flex flex-col">{sidebarContent}</div>
          <button
            aria-label="Close menu"
            className="flex-1 bg-ink/60"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-ink text-plaster">
          <span className="font-heading text-lg">Admin</span>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu">
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </header>
        <main className="p-5 sm:p-8 lg:p-10 max-w-6xl">
          <Outlet context={{
            refreshUnread: () => {
              client.get("/api/inquiries/", { params: { limit: 1 } }).then(({ data }) => setUnread(data.unread)).catch(() => { });
            }
          }} />
        </main>
      </div>
    </div>
  );
}
