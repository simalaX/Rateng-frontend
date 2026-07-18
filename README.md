# Rateng Construction and Interiors — Frontend

React (Create React App — `react-scripts`, not Vite) frontend for the Rateng
Construction and Interiors website. Styled with Tailwind CSS.

Verified working during development: installed with `npm install` and built
with `npm run build` (including `CI=true`, matching how most hosts run
production builds) with zero errors or warnings.

## Design

A "structural drafting" identity built around the four service disciplines,
which are tagged throughout the site with real architectural drawing-set
codes (A = Architectural/Construction, S = Structural/Steel, G =
Glazing/Glass & Aluminium, I = Interiors) — used in the hero, service cards,
portfolio badges, and footer. Palette: ink (near-black, blue-toned),
plaster/paper (warm off-white), burnished bronze and structural slate as
accents. Type: Fraunces (headings), Inter (body), IBM Plex Mono (labels,
codes, data).

Deliberately no stock/placeholder photography — the design leans on
typography, color, and CSS/SVG so it looks intentional from day one and
gets better as you upload real project photos via the admin dashboard.

Motion is intentionally minimal (CSS-only fades and hover states, no
scroll-hijacking or touch-swipe carousels) so the browser's/phone's native
back button and edge-swipe-back gesture always work normally — pages use
real routes (React Router), not JS-only modals, which is what makes
swipe-back work at all.

## Project layout

```
public/
  index.html        SEO meta, Open Graph, JSON-LD, fonts
  robots.txt, sitemap.xml
  rateng.png         Logo mark (placeholder — see Assets below)
src/
  App.js             Routes
  api/client.js       axios instance (attaches JWT, handles 401)
  context/AuthContext.js
  data/staticContent.js   Services list (verbatim), company info, FAQ copy
  components/         Navbar, Footer, WhatsAppFloat, MediaCard, etc.
  pages/               Home, Services, Portfolio, PortfolioDetail, About,
                       FAQ, Contact, Terms, Privacy, NotFound
  pages/admin/         AdminLogin, AdminLayout, AdminOverview, AdminMedia
                       (photos + videos), AdminTestimonials, AdminInquiries,
                       AdminSettings (change password)
```

## 1. Local setup

```bash
npm install
cp .env.example .env       # set REACT_APP_API_URL to your backend
npm start
```

Runs at `http://localhost:3000`, expecting the backend at
`http://localhost:8000` by default.

### Environment variables

| Variable | Required | Notes |
|---|---|---|
| `REACT_APP_API_URL` | Yes | Backend URL, no trailing slash |
| `REACT_APP_GOOGLE_RATING` / `REACT_APP_GOOGLE_REVIEW_COUNT` | No | Rating badge; has demo defaults |
| `REACT_APP_MAP_QUERY` | No | Google Maps embed search query |

Create React App only reads variables prefixed `REACT_APP_`, and bakes them
in at **build time** — after changing them you need to rebuild (or restart
`npm start` in dev).

## 2. Deploying to Render

`render.yaml` provisions a static site with SPA-friendly rewrites (so
refreshing `/admin` or `/portfolio/image/3` doesn't 404).

1. Push this folder to its own GitHub repo.
2. Render Dashboard → **New → Blueprint** → connect the repo.
3. Set `REACT_APP_API_URL` to your deployed backend's URL.
4. Deploy. Once live, go back to the **backend's** `CORS_ORIGINS` env var
   and add this frontend's URL, then restart the backend service.

## Before you launch — replace these placeholders

- **`public/rateng.png` / `logo192.png` / `logo512.png` / `favicon.ico`** —
  generated placeholder monogram. Swap in your real logo (keep the same
  filenames, or update the references in `Navbar.js`, `Footer.js`,
  `AdminLogin.js`, `AdminLayout.js`, and `public/index.html`/`manifest.json`).
- **`public/og-image.jpg`** — placeholder social-share image, same idea.
- **Domain placeholder** — `public/index.html`, `public/robots.txt`, and
  `public/sitemap.xml` all use `https://www.ratengconstructioninteriors.co.ke` as the
  stand-in. Replace with your real domain once you have one.
- **Sample testimonials** — seeded by the backend, obviously labeled as
  placeholders. Replace them from Admin → Testimonials.
- **Rating badge** — `REACT_APP_GOOGLE_RATING`/`REACT_APP_GOOGLE_REVIEW_COUNT`
  default to demo numbers. Update once your Google Business Profile is live.
- **Map location** — the Contact page map defaults to a general "Nairobi,
  Kenya" search. Set `REACT_APP_MAP_QUERY` to your exact address for a
  precise pin.
- **TikTok link** — points to the search URL provided in the brief. If you
  have a direct profile URL, swap `COMPANY.tiktokUrl` in
  `src/data/staticContent.js`.
- **Terms & Privacy pages** — solid starting templates, written to match
  how this specific site actually works (Cloudinary for images, Kenya's
  Data Protection Act, 2019, etc.), but not a substitute for review by a
  Kenyan advocate before publishing.
