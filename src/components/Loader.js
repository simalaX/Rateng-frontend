export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink/50">
      <div className="w-8 h-8 border-2 border-ink/15 border-t-bronze rounded-full animate-spin" />
      <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
    </div>
  );
}
