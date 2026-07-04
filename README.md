# Pynest — Luxury Villas & Private Retreats, Pondicherry

Production static site for [pynest.in](https://pynest.in), deployed via GitHub Pages.
No build tools, no npm, no backend — plain HTML/CSS/JS.

## Status

Every page in the site is built, interconnected, and reachable through the
navbar, footer, and/or in-page links. There are no orphan pages and no
legacy duplicate files.

- **Homepage** (`index.html`) — full villa showcase (8 listed properties),
  experiences, destinations, testimonials, FAQ, and a WhatsApp-based
  enquiry flow. Uses its own inline `<style>`/`<script>` (kept
  self-contained for performance) but now shares the same nav structure,
  wishlist system, and footer link set as every inner page.
- **`/villas/`** — hub page linking to 8 villa-type pages (private pool,
  beach, French quarter, family, couple, pet-friendly, weekend,
  luxury homestays), each with unique SEO metadata and BreadcrumbList
  schema, populated with Pynest's real listed properties. Categories with
  no confirmed matching property (French Quarter, Pet Friendly) show
  honest "coming soon" copy with a concierge CTA instead of fabricated
  listings.
- **`/destinations/`** — hub + 4 guides (White Town, Auroville, Serenity
  Beach, Paradise Beach) with `TouristAttraction` schema.
- **`/experiences/`** — expands the homepage's experience categories into
  full detail sections, cross-linked to relevant villas.
- **`/blog/`** — hub + 3 articles, each with `Article` schema and
  related-post cross-linking.
- **`/about/`, `/faq/`, `/contact/`, `/become-host/`, `/partner/`,
  `/careers/`, `/booking/`** — fully built with unique metadata and
  WhatsApp/email based enquiry flows (no payment backend yet).
- **`/search/`** — client-side filtering (type / bedrooms / budget) over
  `assets/js/villa-data.js`, the single shared dataset that also powers
  the homepage cards and the wishlist page.
- **`/wishlist/`** — see [Wishlist system](#wishlist-system) below.
- **`/privacy-policy/`, `/terms-of-use/`, `/cancellation-policy/`** —
  template legal pages. **These are general templates and have not been
  reviewed by a lawyer** — have them checked before relying on them for
  compliance.
- **`404.html`** — branded not-found page with links back into the site.

## Wishlist system

Client-side only (no backend/accounts yet), built on three files:

- `assets/js/villa-data.js` — single source of truth for villa data
  (id, name, price, features, image, category, url). Used by search,
  wishlist, and the homepage.
- `assets/js/wishlist.js` — persists saved villa IDs to `localStorage`
  (`pynest_wishlist_v1`), wires up every `.villa-wishlist[data-villa-id]`
  heart button site-wide, paints the navbar badge (`#wishlistCount`),
  and exposes `window.PynestWishlist` (`getIds`, `isSaved`, `toggle`,
  `clearAll`, `wireButtons`, `paintBadge`).
- `/wishlist/index.html` — renders saved villas from `villa-data.js`,
  with a "Clear All" action and a dedicated empty state. `noindex`'d
  since it's personal, per-device data.

A save made from any villa card — homepage, a villa-type page, or
search results — shows up here immediately and survives a refresh.

## How pages are built

Every inner page follows this pattern:

```html
<body data-nav-key="about">
  <div id="site-social-dock"></div>
  <div id="site-header"></div>

  <main id="main-content">
    <!-- page content -->
  </main>

  <div id="site-footer"></div>
  <script src="/assets/js/villa-data.js"></script>
  <script src="/assets/js/wishlist.js"></script>
  <script src="/assets/js/include.js"></script>
</body>
```

`/assets/js/include.js` fetches `/components/navbar.html`,
`/components/footer.html`, and `/components/social-dock.html`, injects
them into the placeholder `<div>`s above, auto-highlights the current
nav link via `data-nav-key`, and wires the mobile hamburger menu.
Because all component/asset paths are **absolute** (start with `/`),
this works identically no matter how deep a page lives
(e.g. `/villas/private-pool-villas/`).

`index.html` keeps its own inline `<style>`/`<script>` copy of the same
nav/footer/wishlist markup (for homepage load performance) — kept in
sync by hand when the shared components change.

## Design system

- `assets/css/base.css` — shared tokens (colors, fonts, spacing,
  shadows) plus nav, footer, buttons, social dock, scroll-reveal, and
  the mobile nav toggle.
- `assets/css/inner-page.css` — layout patterns for inner pages (page
  hero, breadcrumb, content prose, value/team grids, CTA band).
- `assets/css/villa-card.css` — the villa card component, shared by the
  homepage, `/villas/`, every villa-type page, search, and wishlist.
- `assets/css/blog-card.css` — the blog card component.
- `assets/css/faq.css` — FAQ accordion styling.

## Folder structure

```
/
├── index.html              ← homepage
├── 404.html
├── robots.txt
├── sitemap.xml
├── CNAME
├── manifest.webmanifest
├── browserconfig.xml
├── schema.json              ← standalone reference copy of the sitewide Organization schema
├── assets/
│   ├── css/                 ← base.css, inner-page.css, villa-card.css, blog-card.css, faq.css
│   ├── js/                  ← include.js, villa-data.js, wishlist.js
│   └── images/               brand/ about/ og/
├── images/villas/            ← real listing photography (villa1–8.webp)
├── components/               ← navbar.html, footer.html, social-dock.html
├── about/ contact/ faq/ booking/ become-host/ partner/ careers/
├── villas/                   ← hub + 8 villa-type pages
├── destinations/              ← hub + 4 destination guides
├── experiences/ blog/ search/ wishlist/
└── privacy-policy/ terms-of-use/ cancellation-policy/
```

All page folders use the clean-URL pattern (`/about/index.html` served
as `/about/`) — there are no legacy top-level `.html` duplicates.

## SEO

Every indexable page has a unique title, meta description, canonical
URL, Open Graph + Twitter Card tags (backed by real branded images in
`assets/images/og/`), robots meta, and JSON-LD (Organization,
LocalBusiness, BreadcrumbList, FAQPage, or TouristAttraction schema as
appropriate). `sitemap.xml` lists every public URL; `/wishlist/` and
`404.html` are intentionally excluded and `noindex`'d.

## Before deploying

1. Replace the Unsplash placeholder imagery (About page, villa-type
   hero backgrounds) with real Pynest photography once available.
2. Have the legal template pages reviewed by a lawyer before relying on
   them for compliance.
3. `submit.php` is a stub — wire it to real form-handling (or remove it)
   before depending on any non-WhatsApp contact form.

## Roadmap

Richer listings, a real search/filter backend, a booking engine, guest
dashboards, a CMS, and native apps are unstarted by design — this
foundation is built so none of them require a rebuild.
