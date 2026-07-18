import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/SEO";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err?.response?.status === 400
          ? "Incorrect email or password."
          : "Couldn't sign in. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink bg-blueprint-grid flex items-center justify-center px-5 py-16">
      <SEO title="Admin Login" />
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src="/rateng.png" alt="Rateng Construction and Interiors" className="w-16 h-16 mb-4" />
          <h1 className="font-heading text-2xl text-plaster">Admin Login</h1>
          <p className="text-plaster/50 text-sm mt-1">Rateng Construction and Interiors</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-light border border-plaster/10 p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-plaster/60 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink border-plaster/20 text-plaster placeholder:text-plaster/30 focus:border-bronze"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-mono text-xs uppercase tracking-wider text-plaster/60 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-ink border-plaster/20 text-plaster placeholder:text-plaster/30 focus:border-bronze pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-plaster/40 hover:text-plaster"
              >
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-bronze text-ink font-mono text-xs uppercase tracking-widest hover:bg-bronze-light transition-colors disabled:opacity-50"
          >
            <FaLock size={12} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
