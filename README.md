# Pynest — Luxury Villas & Private Retreats, Pondicherry

Production static site for [pynest.in](https://pynest.in), deployed via GitHub Pages.
No build tools, no npm, no backend — plain HTML/CSS/JS.

## Status

- **Phase 1 — Homepage:** ✅ Live, untouched, treated as final (`index.html`).
- **Phase 2 — Site structure:** 🚧 In progress.
  - ✅ Shared component system (`/components`, `include.js`)
  - ✅ `/about/`
  - ✅ `/faq/` (full FAQPage schema)
  - ✅ `/contact/` (LocalBusiness schema, WhatsApp form, map embed)
  - ✅ `/villas/` (hub page linking to 8 villa-type pages, ItemList schema)
  - ✅ 8 villa-type pages, each with unique SEO title/description and
    BreadcrumbList schema — populated with Pynest's real listed
    properties (Lakshmi Villa, Luken Bay Villa, Pynest Hut House Villa,
    3BHK Private Beach House Villa, Vintage House 4BHK). Categories with
    no confirmed matching property yet (French Quarter, Pet Friendly)
    ship with honest editorial copy and a concierge CTA instead of
    fabricated listings.
  - ⏳ `/destinations/`, `/experiences/`, `/blog/`, legal pages,
    `/become-host/`, `/partner/`, `/careers/` — folders scaffolded,
    not yet built.
  - ✅ `/destinations/` hub + 4 destination guides (White Town, Auroville,
    Serenity Beach, Paradise Beach) with `TouristAttraction` schema.
    Auroville page links to the real Pynest villa located there
    (Vintage House 4BHK); beach pages cross-link to the Beach Villas
    category rather than naming an unconfirmed exact property.
  - ⏳ `/experiences/`, `/blog/`, legal pages, `/become-host/`,
    `/partner/`, `/careers/` — folders scaffolded, not yet built.

- **Also completed this stage:**
  - ✅ `/experiences/` — expands the homepage's 5 experience categories
    (Romantic, Family, Wellness, Celebrations, Workcation) into full
    detail sections, each cross-linked to the relevant villa page.
  - ✅ `/privacy-policy/`, `/terms-of-use/`, `/cancellation-policy/` —
    template legal pages. **These are general templates and have not
    been reviewed by a lawyer** — have them checked before relying on
    them for compliance.
  - ⏳ Still open: `/blog/`, `/become-host/`, `/partner/`, `/careers/`,
    `/wishlist/`, `/search/`, `/booking/`.

## How pages are built

Every inner page (everything except `index.html`, which stays fully
self-contained) follows this pattern:

```html
<body data-nav-key="about">
  <div id="site-social-dock"></div>
  <div id="site-header"></div>

  <main id="main-content">
    <!-- page content -->
  </main>

  <div id="site-footer"></div>
  <script src="/assets/js/include.js"></script>
</body>
```

`/assets/js/include.js` fetches `/components/navbar.html`,
`/components/footer.html`, and `/components/social-dock.html` and injects
them into the placeholder `<div>`s above. `data-nav-key` on `<body>`
auto-highlights the matching link in the navbar.

Because all component/asset paths are **absolute** (start with `/`), this
works identically no matter how deep a page lives
(e.g. `/villas/private-pool-villas/`).

## Design system

All shared tokens (colors, fonts, spacing, shadows) and shared components
(nav, footer, buttons, social dock, scroll-reveal) live in:

- `assets/css/base.css` — extracted verbatim from the homepage. Do not
  redesign; only extend.
- `assets/css/inner-page.css` — new layout patterns for inner pages
  (page hero, breadcrumb, content prose, value/team grids, CTA band),
  built entirely from the same tokens.

`index.html` keeps its own inline `<style>`/`<script>` and is not wired
into this system — it is treated as final, production-approved.

## Folder structure

```
/
├── index.html              ← homepage (final, do not touch)
├── 404.html
├── robots.txt
├── sitemap.xml
├── CNAME
├── manifest.webmanifest
├── browserconfig.xml
├── assets/
│   ├── css/                ← base.css, inner-page.css
│   ├── js/                 ← include.js
│   ├── fonts/
│   ├── icons/
│   └── images/
│       ├── villas/ destinations/ blog/ testimonials/ gallery/ team/ brand/ og/
├── components/              ← navbar.html, footer.html, social-dock.html
├── about/                   ← ✅ built (sample pattern page)
├── villas/ villa-details/ destinations/ experiences/ blog/ faq/
├── privacy-policy/ cancellation-policy/ terms-of-use/
├── careers/ become-host/ partner/ wishlist/ search/ booking/
└── contact/
```

Empty page folders are scaffolded and ready for content in the next
stages — no restructuring will be needed as they fill in.

## Before deploying

1. Add the real logo file at `assets/images/brand/pynestlogo.png`
   (inner pages reference it there; the homepage still uses its own
   `/pynestlogo.png` at the repo root — keep both in sync).
2. Add `favicon.ico` and `apple-touch-icon.png` at the repo root.
3. Replace Unsplash placeholder imagery on the About page with real
   Pynest photography once available.

## Roadmap

See project brief — Phases 3–14 (villa listings, details, search/filters,
booking engine, dashboards, CMS, AI concierge, native apps) will be added
incrementally without requiring a rebuild of this foundation.
