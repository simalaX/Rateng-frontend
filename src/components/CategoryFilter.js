import { CATEGORY_LABELS, CATEGORY_ORDER } from "../data/staticContent";

export default function CategoryFilter({ value, onChange }) {
  const options = [{ key: "", label: "All", code: "\u2022" }, ...CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORY_LABELS[key].label,
    code: CATEGORY_LABELS[key].code,
  }))];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key || "all"}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors ${
              active
                ? "bg-ink text-plaster border-ink"
                : "bg-transparent text-ink/70 border-ink/20 hover:border-bronze hover:text-ink"
            }`}
          >
            <span className={active ? "text-bronze-light" : "text-bronze"}>{opt.code}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
