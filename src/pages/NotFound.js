import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-24 bg-paper">
        <p className="font-mono text-bronze text-sm mb-3">404</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-ink mb-4">Page not found</h1>
        <p className="text-ink/60 mb-8 max-w-md">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <Link
          to="/"
          className="px-7 py-3.5 bg-ink text-plaster font-mono text-xs uppercase tracking-widest hover:bg-ink-light transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
