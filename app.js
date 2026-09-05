/* ============================================================
   JAWSATAK47 — APP LOGIC
   Reads from the data arrays in data.js and renders every
   section. No content lives in this file — if you're editing
   copy, track titles, or credits, go to js/data.js instead.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const byId = (arr, id) => arr.find((item) => item.id === id);

  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };

  // Deterministic placeholder color/pattern for cover art & artwork
  // tiles when no real image exists yet, so the grid never shows a
  // broken-image icon while assets are pending.
  const PLACEHOLDER_STYLES = ["cover-art--ink", "cover-art--brick", "cover-art--gold"];
  function placeholderClass(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return PLACEHOLDER_STYLES[hash % PLACEHOLDER_STYLES.length];
  }

  function statusBadge(status) {
    const map = {
      Released: "badge-status--released",
      "In Progress": "badge-status--progress",
      Announced: "badge-status--announced",
    };
    return `<span class="badge-status ${map[status] || ""}">${status}</span>`;
  }

  function coverArtHTML(album, sizeClass) {
    if (album.cover) {
      return `<div class="cover-art ${sizeClass || ""}"><img src="${album.cover}" alt="${album.title} cover art" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;"></div>`;
    }
    return `<div class="cover-art ${placeholderClass(album.id)} ${sizeClass || ""}">
      <span class="cover-art__label">${album.title}</span>
    </div>`;
  }

  function namesFor(ids, list) {
    return (ids || []).map((id) => (byId(list, id) || { name: id }).name);
  }

  /* ==========================================================
     NAV / MOBILE MENU
     ========================================================== */
  function initNav() {
    const toggle = $(".nav-toggle");
    const menu = $(".mobile-menu");
    const close = $(".mobile-menu__close");
    if (!toggle || !menu) return;
    const open = () => { menu.classList.add("is-open"); document.body.style.overflow = "hidden"; };
    const shut = () => { menu.classList.remove("is-open"); document.body.style.overflow = ""; };
    toggle.addEventListener("click", open);
    close.addEventListener("click", shut);
    $$("a", menu).forEach((a) => a.addEventListener("click", shut));
  }

  /* ==========================================================
     HERO / FEATURED PROJECT
     ========================================================== */
  function renderFeatured() {
    const mount = $("#now-spinning");
    if (!mount) return;
    const album = byId(ALBUMS, FEATURED.albumId);
    if (!album) return;
    mount.innerHTML = `
      <span class="now-spinning__label">${FEATURED.eyebrow}</span>
      <div class="now-spinning__body">
        ${coverArtHTML(album)}
        <div>
          <div class="now-spinning__title">${album.title}</div>
          <div class="now-spinning__meta">${album.type} · ${namesFor(album.producers, PRODUCERS).join(", ") || "[ADD PRODUCER]"}</div>
          <div class="now-spinning__meta">${statusBadge(album.status)}</div>
        </div>
      </div>
      <div class="now-spinning__cta">
        <button class="btn btn--solid" data-open-album="${album.id}">View project</button>
      </div>`;
    $("[data-open-album]", mount).addEventListener("click", (e) => {
      openAlbumModal(e.currentTarget.dataset.openAlbum);
    });
  }

  /* ==========================================================
     DISCOGRAPHY
     ========================================================== */
  let activeFilter = "ALL";
  let searchTerm = "";

  function matchesSearch(album, term) {
    if (!term) return true;
    const haystack = [
      album.title,
      album.type,
      ...namesFor(album.producers, PRODUCERS),
      ...namesFor(album.features, COLLABORATORS),
    ].join(" ").toLowerCase();
    return haystack.includes(term.toLowerCase());
  }

  function renderAlbumGrid() {
    const grid = $("#album-grid");
    if (!grid) return;
    const filtered = ALBUMS.filter((a) => {
      const typeOk = activeFilter === "ALL" || a.type.toUpperCase() === activeFilter;
      return typeOk && matchesSearch(a, searchTerm);
    });

    if (!filtered.length) {
      grid.innerHTML = `<p class="empty-state">Nothing here yet — try a different filter, or check back as new projects are added.</p>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (a) => `
      <button class="album-card" data-open-album="${a.id}" aria-label="Open ${a.title} details">
        ${coverArtHTML(a, "album-card__art")}
        <div class="album-card__meta">
          <div class="album-card__status">${statusBadge(a.status)}</div>
          <div class="album-card__title">${a.title}</div>
          <div class="album-card__sub">${a.type} · ${a.year}</div>
        </div>
      </button>`
      )
      .join("");

    $$("[data-open-album]", grid).forEach((btn) =>
      btn.addEventListener("click", () => openAlbumModal(btn.dataset.openAlbum))
    );
  }

  function initDiscographyControls() {
    $$(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeFilter = btn.dataset.filter;
        renderAlbumGrid();
      });
    });
    const search = $("#discog-search");
    if (search) {
      search.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderAlbumGrid();
      });
    }
  }

  /* ==========================================================
     ALBUM MODAL
     ========================================================== */
  function openAlbumModal(albumId) {
    const album = byId(ALBUMS, albumId);
    if (!album) return;
    const producers = namesFor(album.producers, PRODUCERS);
    const features = namesFor(album.features, COLLABORATORS);

    const tracklistHTML = album.tracklist
      .map((t) => {
        const feat = namesFor(t.featuring, COLLABORATORS);
        return `
        <button class="track-row" data-track-title="${t.title}" data-track-project="${album.title}">
          <span class="track-row__num">${String(t.number).padStart(2, "0")}</span>
          <span>
            <span class="track-row__title">${t.title}</span>
            ${feat.length ? `<div class="track-row__feat">feat. ${feat.join(", ")}</div>` : ""}
          </span>
          <svg class="track-row__play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
        </button>`;
      })
      .join("");

    const linksHTML = Object.entries(album.links || {})
      .filter(([, url]) => url && !url.startsWith("["))
      .map(([platform, url]) => `<a class="btn" href="${url}" target="_blank" rel="noopener">${platform}</a>`)
      .join("");

    showModal(`
      <div class="modal__head">
        <div>
          <div class="catalog-tag catalog-tag--brick" style="margin-bottom:8px;">${album.type.toUpperCase()} · ${album.year}</div>
          <h3 style="font-size:2rem;text-transform:uppercase;">${album.title}</h3>
          <div style="color:var(--faded);margin-top:4px;">${statusBadge(album.status)} &nbsp; Produced by ${producers.join(", ") || "[ADD PRODUCER]"}${features.length ? ` &nbsp;·&nbsp; feat. ${features.join(", ")}` : ""}</div>
        </div>
        <button class="modal__close" aria-label="Close">&times;</button>
      </div>
      <div class="modal__body">
        ${coverArtHTML(album)}
        <div class="modal__section">
          <h4>Story</h4>
          <p>${album.story}</p>
        </div>
        <div class="modal__section">
          <h4>Tracklist (${album.tracklist.length}${typeof album.trackCount === "number" ? ` of ${album.trackCount}` : ""})</h4>
          <div class="tracklist">${tracklistHTML}</div>
        </div>
        ${
          producers.length
            ? `<div class="modal__section"><h4>Producers</h4><div class="chip-row">${album.producers
                .map((id) => `<button class="chip" data-open-producer="${id}">${(byId(PRODUCERS, id) || {}).name || id}</button>`)
                .join("")}</div></div>`
            : ""
        }
        ${
          features.length
            ? `<div class="modal__section"><h4>Featured artists</h4><div class="chip-row">${album.features
                .map((id) => `<button class="chip" data-open-collab="${id}">${(byId(COLLABORATORS, id) || {}).name || id}</button>`)
                .join("")}</div></div>`
            : ""
        }
        ${linksHTML ? `<div class="modal__links">${linksHTML}</div>` : ""}
      </div>
    `);

    $$("[data-track-title]").forEach((row) =>
      row.addEventListener("click", () => setNowPlaying(row.dataset.trackTitle, row.dataset.trackProject))
    );
    $$("[data-open-producer]").forEach((c) =>
      c.addEventListener("click", () => { closeModal(); openProducerModal(c.dataset.openProducer); })
    );
    $$("[data-open-collab]").forEach((c) =>
      c.addEventListener("click", () => { closeModal(); openCollaboratorModal(c.dataset.openCollab); })
    );
  }

  /* ==========================================================
     COLLABORATORS + PRODUCERS
     ========================================================== */
  function renderPeopleGrid(mountSelector, list, roleLabel, openFn) {
    const mount = $(mountSelector);
    if (!mount) return;
    mount.innerHTML = list
      .map(
        (p) => `
      <button class="person-card" data-open="${p.id}">
        <div class="person-card__name">${p.name}</div>
        <div class="person-card__role">${p.role || roleLabel}${p.region ? ` · ${p.region}` : ""}</div>
      </button>`
      )
      .join("");
    $$("[data-open]", mount).forEach((btn) => btn.addEventListener("click", () => openFn(btn.dataset.open)));
  }

  function personProjectsHTML(person) {
    const projects = (person.projects || []).map((id) => byId(ALBUMS, id)).filter(Boolean);
    if (!projects.length) return `<p style="color:var(--faded);">No linked releases yet.</p>`;
    return `<div class="chip-row">${projects
      .map((a) => `<button class="chip" data-open-album="${a.id}">${a.title}</button>`)
      .join("")}</div>`;
  }

  function openCollaboratorModal(id) {
    const person = byId(COLLABORATORS, id);
    if (!person) return;
    showModal(`
      <div class="modal__head">
        <div>
          <div class="catalog-tag" style="margin-bottom:8px;">${person.role}${person.region ? ` · ${person.region}` : ""}</div>
          <h3 style="font-size:2rem;text-transform:uppercase;">${person.name}</h3>
        </div>
        <button class="modal__close" aria-label="Close">&times;</button>
      </div>
      <div class="modal__body">
        <p>${person.bio}</p>
        <div class="modal__section"><h4>Projects together</h4>${personProjectsHTML(person)}</div>
      </div>
    `);
    $$("[data-open-album]").forEach((c) => c.addEventListener("click", () => { closeModal(); openAlbumModal(c.dataset.openAlbum); }));
  }

  function openProducerModal(id) {
    const person = byId(PRODUCERS, id);
    if (!person) return;
    showModal(`
      <div class="modal__head">
        <div>
          <div class="catalog-tag catalog-tag--gold" style="margin-bottom:8px;">Producer</div>
          <h3 style="font-size:2rem;text-transform:uppercase;">${person.name}</h3>
        </div>
        <button class="modal__close" aria-label="Close">&times;</button>
      </div>
      <div class="modal__body">
        <p>${person.bio}</p>
        <div class="modal__section"><h4>Projects together</h4>${personProjectsHTML(person)}</div>
      </div>
    `);
    $$("[data-open-album]").forEach((c) => c.addEventListener("click", () => { closeModal(); openAlbumModal(c.dataset.openAlbum); }));
  }

  /* ==========================================================
     VIDEOS
     ========================================================== */
  function renderVideos() {
    const mount = $("#video-grid");
    if (!mount) return;
    if (!VIDEOS.length) {
      mount.innerHTML = `<p class="empty-state">The video archive is empty for now — check back soon.</p>`;
      return;
    }
    mount.innerHTML = VIDEOS.map(
      (v) => `
      <button class="video-card" data-open-video="${v.id}">
        <div class="video-thumb">
          ${v.thumbnail ? `<img src="${v.thumbnail}" alt="">` : ""}
          <span class="video-thumb__play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
        </div>
        <div class="video-card__title">${v.title}</div>
        <div class="video-card__meta">${(byId(ALBUMS, v.project) || {}).title || ""} · ${v.year}</div>
      </button>`
    ).join("");
    $$("[data-open-video]", mount).forEach((btn) =>
      btn.addEventListener("click", () => openVideoModal(btn.dataset.openVideo))
    );
  }

  function openVideoModal(id) {
    const video = byId(VIDEOS, id);
    if (!video) return;
    showModal(`
      <div class="modal__head">
        <div>
          <h3 style="font-size:1.8rem;text-transform:uppercase;">${video.title}</h3>
          <div style="color:var(--faded);">${(byId(ALBUMS, video.project) || {}).title || ""} · ${video.year}</div>
        </div>
        <button class="modal__close" aria-label="Close">&times;</button>
      </div>
      <div class="modal__body">
        ${
          video.embedUrl
            ? `<div style="aspect-ratio:16/9;"><iframe style="width:100%;height:100%;border:0;" src="${video.embedUrl}" title="${video.title}" allowfullscreen></iframe></div>`
            : `<div class="cover-art ${placeholderClass(video.id)}" style="aspect-ratio:16/9;"><span class="cover-art__label">Video coming soon</span></div>`
        }
        <div class="modal__section"><p>${video.description}</p></div>
      </div>
    `);
  }

  /* ==========================================================
     ARTWORK
     ========================================================== */
  let artworkIndex = 0;

  function renderArtwork() {
    const mount = $("#art-grid");
    if (!mount) return;
    mount.innerHTML = ARTWORK.map((a, i) => {
      const ar = (0.7 + (i % 3) * 0.25).toFixed(2); // varied aspect ratios for a lively grid
      return `
      <button class="art-tile" data-art-index="${i}">
        <div class="art-tile__frame ${a.image ? "" : placeholderClass(a.id)}" style="--ar:${ar};">
          ${a.image ? `<img src="${a.image}" alt="${a.title}">` : ""}
          <span class="art-tile__label">${a.title}</span>
        </div>
        <div class="art-tile__cap">${a.category} · ${a.year}</div>
      </button>`;
    }).join("");
    $$("[data-art-index]", mount).forEach((btn) =>
      btn.addEventListener("click", () => openArtworkModal(Number(btn.dataset.artIndex)))
    );
  }

  function openArtworkModal(index) {
    artworkIndex = index;
    const a = ARTWORK[index];
    const related = a.related ? byId(ALBUMS, a.related) : null;
    showModal(`
      <div class="modal__head">
        <div>
          <div class="catalog-tag catalog-tag--outline" style="margin-bottom:8px;">${a.category}</div>
          <h3 style="font-size:1.8rem;text-transform:uppercase;">${a.title}</h3>
          <div style="color:var(--faded);">${a.year}${related ? ` · from ${related.title}` : ""}</div>
        </div>
        <button class="modal__close" aria-label="Close">&times;</button>
      </div>
      <div class="modal__body">
        <div class="cover-art ${a.image ? "" : placeholderClass(a.id)}" style="aspect-ratio:4/5;">
          ${a.image ? `<img src="${a.image}" alt="${a.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">` : `<span class="cover-art__label">${a.title}</span>`}
        </div>
        <div class="lightbox-nav">
          <button class="btn" data-art-nav="-1">&larr; Previous</button>
          <button class="btn" data-art-nav="1">Next &rarr;</button>
        </div>
      </div>
    `);
    $$("[data-art-nav]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const next = (artworkIndex + Number(btn.dataset.artNav) + ARTWORK.length) % ARTWORK.length;
        openArtworkModal(next);
      })
    );
  }

  /* ==========================================================
     TIMELINE
     ========================================================== */
  function renderTimeline() {
    const mount = $("#timeline");
    if (!mount) return;
    mount.innerHTML = TIMELINE.map(
      (t) => `
      <div class="timeline-item">
        <div class="timeline-item__year">${t.year} — ${t.era}</div>
        <div class="timeline-item__title">${t.title}</div>
        <p class="timeline-item__desc">${t.description}</p>
      </div>`
    ).join("");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      $$(".timeline-item", mount).forEach((item) => observer.observe(item));
    } else {
      $$(".timeline-item", mount).forEach((item) => item.classList.add("is-visible"));
    }
  }

  /* ==========================================================
     VAULT
     ========================================================== */
  function renderVault() {
    const mount = $("#vault-list");
    if (!mount) return;
    mount.innerHTML = VAULT.map(
      (v) => `
      <div class="vault-item">
        <div class="vault-item__stamp"><span class="catalog-tag catalog-tag--outline">${v.kind}</span></div>
        <div>
          <div class="vault-item__year">${v.year}</div>
          <div class="vault-item__title">${v.title}</div>
          <p class="vault-item__desc">${v.description}</p>
        </div>
      </div>`
    ).join("");
  }

  /* ==========================================================
     BIO
     ========================================================== */
  function renderBio() {
    const mount = $("#bio-chapters");
    if (!mount) return;
    mount.innerHTML = BIO.map(
      (c) => `<div class="bio-chapter"><h3>${c.heading}</h3><p>${c.body}</p></div>`
    ).join("");
  }

  /* ==========================================================
     MODAL (shared)
     ========================================================== */
  let lastFocused = null;
  function showModal(innerHTML) {
    const backdrop = $("#modal-backdrop");
    const modal = $("#modal");
    modal.innerHTML = innerHTML;
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lastFocused = document.activeElement;
    const closeBtn = $(".modal__close", modal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.focus();
  }
  function closeModal() {
    $("#modal-backdrop").classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  function initModal() {
    const backdrop = $("#modal-backdrop");
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  /* ==========================================================
     PLAYER BAR (UI stub — no audio wired up yet)
     ========================================================== */
  let isPlaying = true;
  function setNowPlaying(track, project) {
    const bar = $("#player-bar");
    $("#player-track").textContent = track;
    $("#player-project").textContent = project;
    bar.classList.add("is-active");
    isPlaying = true;
    bar.classList.remove("is-paused");
  }
  function initPlayer() {
    const playBtn = $("#player-play");
    if (!playBtn) return;
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      $("#player-bar").classList.toggle("is-paused", !isPlaying);
      playBtn.innerHTML = isPlaying
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    });
  }

  /* ==========================================================
     FOOTER / HERO — driven by the SITE object in data.js
     ========================================================== */
  function renderFooterYear() {
    const y = $("#footer-year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function renderSiteCopy() {
    const tagline = $("#hero-tagline");
    const statement = $("#hero-statement");
    if (tagline) tagline.textContent = SITE.tagline;
    if (statement) statement.textContent = SITE.statement;

    $$("#footer-social a[data-social]").forEach((a) => {
      const url = SITE.social[a.dataset.social];
      if (url && !url.startsWith("[")) a.href = url;
    });
    const booking = $("#footer-booking");
    if (booking && SITE.contact && !SITE.contact.startsWith("[")) {
      booking.href = `mailto:${SITE.contact}`;
    }
    const qf = $("#footer-quarkforce");
    if (qf && SITE.sisterBrand.url && !SITE.sisterBrand.url.startsWith("[")) {
      qf.href = SITE.sisterBrand.url;
    }
  }

  /* ==========================================================
     INIT
     ========================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initModal();
    initPlayer();
    renderSiteCopy();
    renderFeatured();
    renderBio();
    renderAlbumGrid();
    initDiscographyControls();
    renderPeopleGrid("#collaborator-grid", COLLABORATORS, "Collaborator", openCollaboratorModal);
    renderPeopleGrid("#producer-grid", PRODUCERS, "Producer", openProducerModal);
    renderVideos();
    renderArtwork();
    renderTimeline();
    renderVault();
    renderFooterYear();
  });
})();
