import { useState } from "react";
import { FaCheckCircle, FaKey } from "react-icons/fa";
import client from "../../api/client";

export default function AdminSettings() {
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [status, setStatus] = useState("idle"); // idle | saving | success | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.new_password !== form.confirm_password) {
      setError("New password and confirmation don't match.");
      return;
    }
    if (form.new_password.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setStatus("saving");
    try {
      await client.put("/api/auth/change-password", {
        current_password: form.current_password,
        new_password: form.new_password,
      });
      setStatus("success");
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setStatus("error");
      setError(err?.response?.data?.detail || "Couldn't change password. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-ink mb-2">Settings</h1>
      <p className="text-ink/50 mb-8">Change your admin login password.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 p-6 max-w-md space-y-5">
        <div>
          <label htmlFor="current_password" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
            Current Password
          </label>
          <input
            id="current_password"
            type="password"
            name="current_password"
            required
            autoComplete="current-password"
            value={form.current_password}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="new_password" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
            New Password
          </label>
          <input
            id="new_password"
            type="password"
            name="new_password"
            required
            minLength={8}
            autoComplete="new-password"
            value={form.new_password}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="confirm_password" className="block font-mono text-xs uppercase tracking-wider text-ink/60 mb-2">
            Confirm New Password
          </label>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            required
            minLength={8}
            autoComplete="new-password"
            value={form.confirm_password}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-green-700">
            <FaCheckCircle /> Password updated successfully.
          </p>
        )}
        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={status === "saving"}
          className="flex items-center gap-2 px-6 py-3 bg-bronze text-ink font-mono text-xs uppercase tracking-wider hover:bg-bronze-light transition-colors disabled:opacity-50"
        >
          <FaKey size={12} /> {status === "saving" ? "Saving..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
