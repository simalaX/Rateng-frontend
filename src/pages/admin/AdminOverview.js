import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelopeOpenText, FaImage, FaVideo } from "react-icons/fa";
import client from "../../api/client";
import Loader from "../../components/Loader";

function StatCard({ icon: Icon, label, value, to }) {
  return (
    <Link
      to={to}
      className="bg-white border border-ink/10 p-6 flex items-start justify-between hover:border-bronze/50 transition-colors"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-2">{label}</p>
        <p className="font-heading text-3xl text-ink">{value}</p>
      </div>
      <Icon className="text-bronze" size={22} />
    </Link>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      client.get("/api/gallery/", { params: { limit: 1 } }),
      client.get("/api/videos/", { params: { limit: 1 } }),
      client.get("/api/inquiries/", { params: { limit: 1 } }),
    ])
      .then(([gallery, videos, inquiries]) => {
        if (!active) return;
        setStats({
          gallery: gallery.data.total,
          videos: videos.data.total,
          inquiries: inquiries.data.total,
          unread: inquiries.data.unread,
        });
      })
      .catch(() => {
        if (active) setStats({ gallery: 0, videos: 0, inquiries: 0, unread: 0 });
      });
    return () => {
      active = false;
    };
  }, []);

  if (!stats) return <Loader label="Loading dashboard" />;

  return (
    <div>
      <h1 className="font-heading text-3xl text-ink mb-2">Overview</h1>
      <p className="text-ink/50 mb-8">A quick look at your site's content.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard icon={FaImage} label="Gallery Photos" value={stats.gallery} to="/admin/media" />
        <StatCard icon={FaVideo} label="Videos" value={stats.videos} to="/admin/media" />
        <StatCard
          icon={FaEnvelopeOpenText}
          label={stats.unread > 0 ? `Inquiries (${stats.unread} unread)` : "Inquiries"}
          value={stats.inquiries}
          to="/admin/inquiries"
        />
      </div>
    </div>
  );
}
