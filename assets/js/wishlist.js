/* ══════════════════════════════════════════════════════════════════
   PYNEST — WISHLIST ENGINE
   Client-side only (no backend yet — see roadmap Phase 9). Persists
   saved villa IDs to localStorage and wires up any button matching
   `.villa-wishlist[data-villa-id]` found on the page, so the same
   heart state is consistent across villa-type pages, search, and the
   dedicated /wishlist/ page.
   ══════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  var KEY = "pynest_wishlist_v1";

  function getIds(){
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      return [];
    }
  }

  function setIds(ids){
    try { window.localStorage.setItem(KEY, JSON.stringify(ids)); }
    catch(e){ console.error("[Pynest wishlist] could not save", e); }
  }

  function isSaved(id){
    return getIds().indexOf(id) !== -1;
  }

  function toggle(id){
    var ids = getIds();
    var idx = ids.indexOf(id);
    if(idx === -1){ ids.push(id); } else { ids.splice(idx, 1); }
    setIds(ids);
    document.dispatchEvent(new CustomEvent("pynest:wishlist-changed", { detail: { ids: ids } }));
    return ids.indexOf(id) !== -1;
  }

  function paintButton(btn){
    var id = btn.getAttribute("data-villa-id");
    if(!id) return;
    var saved = isSaved(id);
    btn.textContent = saved ? "♥" : "♡";
    btn.setAttribute("aria-pressed", saved ? "true" : "false");
    btn.style.color = saved ? "var(--g)" : "";
    btn.style.borderColor = saved ? "var(--g)" : "";
  }

  function clearAll(){
    setIds([]);
    document.dispatchEvent(new CustomEvent("pynest:wishlist-changed", { detail: { ids: [] } }));
  }

  function wireButtons(){
    document.querySelectorAll(".villa-wishlist[data-villa-id]").forEach(function(btn){
      paintButton(btn);
      if(btn.dataset.wishlistWired) return;
      btn.dataset.wishlistWired = "1";
      btn.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        toggle(btn.getAttribute("data-villa-id"));
        paintButton(btn);
      });
    });
  }

  /* ── Navbar badge ──────────────────────────────────────────
     Any injected navbar containing #wishlistCount gets the live
     saved-villa count painted in, and hidden entirely at zero. */
  function paintBadge(){
    var badge = document.getElementById("wishlistCount");
    if(!badge) return;
    var n = getIds().length;
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  document.addEventListener("DOMContentLoaded", function(){ wireButtons(); paintBadge(); });
  // Re-wire after include.js injects components (some pages render cards after fetch)
  document.addEventListener("pynest:components-ready", function(){ wireButtons(); paintBadge(); });
  document.addEventListener("pynest:wishlist-changed", paintBadge);

  window.PynestWishlist = { getIds: getIds, isSaved: isSaved, toggle: toggle, clearAll: clearAll, wireButtons: wireButtons, paintBadge: paintBadge };
})();
