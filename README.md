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

- **Also completed:**
  - ✅ `/become-host/` — property-owner acquisition page with benefits
    grid, 3-step onboarding, and WhatsApp-based application form.
  - ✅ `/partner/` — for travel agents, corporate offsites, and wedding
    planners, with a WhatsApp-based enquiry form.
  - ✅ `/careers/` — general hiring page. Lists the *areas* Pynest
    typically hires for (not fabricated live job postings), with an
    email-based application form.
  - ⏳ Still open: `/blog/`, `/wishlist/`, `/search/`, `/booking/`.

- **Also completed:**
  - ✅ `/blog/` — hub + 3 articles (weekend guide, Auroville feature,
    pool-vs-beach comparison), each with `Article` schema, related-posts
    cross-linking, and internal links into the villas/destinations pages.
  - ⏳ Still open: `/wishlist/`, `/search/`, `/booking/` — these are
    functional (Phase 5–6) pages. As static HTML with no backend they
    need a scoped decision on how much real functionality (e.g.
    client-side search over hardcoded data, `localStorage` wishlist)
    to build vs. leaving as a "coming soon" placeholder.

- **Also completed:**
  - ✅ `/search/` — real client-side filtering (type / bedrooms / budget)
    over `assets/js/villa-data.js`, the shared dataset mirroring the
    5 real listings already on the homepage.
  - ✅ `/wishlist/` — `assets/js/wishlist.js` persists saved villa IDs
    to `localStorage` and wires up every `.villa-wishlist` heart button
    site-wide (villa-type pages + search), so a save made anywhere
    shows up here. Personal/per-device only — `noindex`'d, and not a
    substitute for a real account system once there's a backend.
  - ✅ `/booking/` — framed honestly as "how booking works" rather than
    a fake checkout, since there's no payment backend yet (Phase 8).
    Explains the current WhatsApp-concierge flow step by step.

**Site structure (Phase 2) is now functionally complete** — every page
in the original brief exists and is reachable. Remaining phases
(3–14: richer listings, real search/filter backend, booking engine,
dashboards, CMS, AI concierge, native apps) are unstarted by design —
this foundation is built so none of them require a rebuild.

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
