import { FaStar } from "react-icons/fa";
import { COMPANY } from "../data/staticContent";

// Demo values by default (REACT_APP_GOOGLE_RATING / REACT_APP_GOOGLE_REVIEW_COUNT).
// Update these once your Google Business Profile is live — see the frontend README.
const rating = process.env.REACT_APP_GOOGLE_RATING || COMPANY.googleRating;
const reviewCount = process.env.REACT_APP_GOOGLE_REVIEW_COUNT || COMPANY.googleReviewCount;

export default function RatingBadge({ dark = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-xs sm:text-sm ${dark ? "text-plaster/80" : "text-ink/70"
        }`}
    >
      <span className="flex gap-0.5 text-bronze">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} size={13} />
        ))}
      </span>
      <span>
        {rating}/5{reviewCount ? ` · ${reviewCount} Google Reviews` : ""}
      </span>
    </div>
  );
}
