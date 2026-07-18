export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`font-mono text-xs tracking-[0.2em] uppercase mb-3 ${
            dark ? "text-bronze-light" : "text-bronze-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] ${
          dark ? "text-plaster" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg ${dark ? "text-plaster/70" : "text-ink/65"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
