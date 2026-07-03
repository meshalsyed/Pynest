/* ══════════════════════════════════════════════════════════════════
   PYNEST — VILLA DATA
   Single source of truth for villa data used by client-side search
   and wishlist pages. Mirrors the real listings already published on
   the homepage — update here if a listing changes, and both pages
   stay in sync automatically.
   ══════════════════════════════════════════════════════════════════ */
window.PYNEST_VILLAS = [
  {
    id: "lakshmi",
    name: "Lakshmi Villa",
    tag: "Premium Villa Residence",
    badge: "Signature",
    loc: "Nila St, Vasantha Nagar, Puducherry",
    bedrooms: 2,
    price: 4000,
    feats: ["2 Bedrooms", "Fully Furnished", "Free Car Parking"],
    img: "https://pynest.in/images/villas/villa1.webp",
    types: ["couple-villas", "weekend-villas"],
    url: "/villas/couple-villas/"
  },
  {
    id: "luken",
    name: "Luken Bay Villa",
    tag: "Beachfront Villa",
    badge: null,
    loc: "Kuruchikuppam, Puducherry",
    bedrooms: 4,
    price: 4000,
    feats: ["4 Bedrooms", "Beach View", "Free Car Parking"],
    img: "https://pynest.in/images/villas/villa2.webp",
    types: ["beach-villas", "family-villas", "weekend-villas"],
    url: "/villas/beach-villas/"
  },
  {
    id: "huthouse",
    name: "Pynest Hut House Villa",
    tag: "Hut House Villa",
    badge: null,
    loc: "Anumandai, Puducherry",
    bedrooms: 4,
    price: 3000,
    feats: ["4 Bedrooms", "Beach View", "Free Car Parking"],
    img: "https://pynest.in/images/villas/villa3.webp",
    types: ["beach-villas", "weekend-villas", "luxury-homestays"],
    url: "/villas/beach-villas/"
  },
  {
    id: "beachhouse3bhk",
    name: "Pynest 3BHK Private Beach House Villa",
    tag: "Premium Villa Residence",
    badge: null,
    loc: "Hanumandhai, Puducherry",
    bedrooms: 3,
    price: 15000,
    feats: ["3 Bedrooms", "Private Beach Access", "Free Car Parking"],
    img: "https://pynest.in/images/villas/villa4.webp",
    types: ["beach-villas"],
    url: "/villas/beach-villas/"
  },
  {
    id: "vintage4bhk",
    name: "Pynest Vintage House 4BHK Private Villa",
    tag: "Premium Villa Residence",
    badge: null,
    loc: "Auroville, Puducherry — 300m from Auroville Beach",
    bedrooms: 4,
    price: 15000,
    feats: ["4 Bedrooms", "Private Pool (Adults & Kids)", "Spacious Garden", "Indoor Games"],
    img: "https://pynest.in/images/villas/villa5.webp",
    types: ["private-pool-villas", "family-villas", "luxury-homestays"],
    url: "/villas/private-pool-villas/"
  }
];
