/* ============================================================
   Espace Famille — logique du site
   Verrou par mot de passe + galerie + lightbox
   ============================================================ */

(function () {
  "use strict";

  const SESSION_KEY = "espace-famille-unlocked";

  const $ = (id) => document.getElementById(id);

  const lockScreen = $("lock-screen");
  const site = $("site");
  const lockForm = $("lock-form");
  const passwordInput = $("password-input");
  const lockError = $("lock-error");

  /* ---------- Verrouillage ---------- */

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async function tryUnlock(password) {
    const hash = await sha256(password);
    if (hash === CONFIG.passwordHash) {
      sessionStorage.setItem(SESSION_KEY, hash);
      openSite();
      return true;
    }
    return false;
  }

  function openSite() {
    lockScreen.classList.add("hidden");
    site.classList.remove("hidden");
    renderAlbums();
  }

  function lockSite() {
    sessionStorage.removeItem(SESSION_KEY);
    site.classList.add("hidden");
    closeLightbox();
    lockScreen.classList.remove("hidden");
    lockError.textContent = "";
    passwordInput.value = "";
    passwordInput.focus();
  }

  lockForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = await tryUnlock(passwordInput.value);
    if (!ok) {
      lockError.textContent = "Mot de passe incorrect. Réessayez.";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  $("toggle-password").addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.focus();
  });

  $("logout-btn").addEventListener("click", lockSite);

  /* ---------- Albums ---------- */

  function renderAlbums() {
    const grid = $("albums-grid");
    grid.innerHTML = "";
    $("albums-count").textContent =
      ALBUMS.length + (ALBUMS.length > 1 ? " albums" : " album");

    ALBUMS.forEach((album) => {
      const card = document.createElement("article");
      card.className = "album-card";

      const cover = document.createElement("div");
      cover.className = "album-cover";
      if (album.couverture) {
        const img = document.createElement("img");
        img.src = album.couverture;
        img.alt = album.titre;
        img.loading = "lazy";
        cover.appendChild(img);
      } else {
        const emoji = document.createElement("span");
        emoji.className = "album-emoji";
        emoji.textContent = album.emoji || "📷";
        cover.appendChild(emoji);
      }

      const info = document.createElement("div");
      info.className = "album-info";
      const title = document.createElement("h4");
      title.textContent = album.titre;
      const count = document.createElement("span");
      count.textContent = album.photos.length + " photo" + (album.photos.length > 1 ? "s" : "");
      info.append(title, count);

      card.append(cover, info);
      card.addEventListener("click", () => openAlbum(album.id));
      grid.appendChild(card);
    });
  }

  function openAlbum(albumId) {
    const album = ALBUMS.find((a) => a.id === albumId);
    if (!album) return;

    $("albums").parentElement.querySelectorAll("section").forEach((s) => {
      if (s.id !== "accueil") s.classList.add("hidden");
    });
    $("galerie").classList.remove("hidden");

    $("galerie-title").textContent = album.titre;
    $("galerie-count").textContent =
      album.photos.length + " photo" + (album.photos.length > 1 ? "s" : "");

    const grid = $("photos-grid");
    grid.innerHTML = "";

    album.photos.forEach((photo, index) => {
      const thumb = document.createElement("button");
      thumb.className = "photo-thumb";
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.legende || album.titre;
      img.loading = "lazy";
      thumb.appendChild(img);
      thumb.addEventListener("click", () => openLightbox(album, index));
      grid.appendChild(thumb);
    });

    $("galerie").scrollIntoView({ behavior: "smooth" });
  }

  $("back-btn").addEventListener("click", () => {
    $("galerie").classList.add("hidden");
    $("albums").classList.remove("hidden");
    $("albums").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Lightbox ---------- */

  let currentAlbum = null;
  let currentIndex = 0;

  function openLightbox(album, index) {
    currentAlbum = album;
    currentIndex = index;
    updateLightbox();
    $("lightbox").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    $("lightbox").classList.add("hidden");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const photo = currentAlbum.photos[currentIndex];
    $("lightbox-img").src = photo.src;
    $("lightbox-img").alt = photo.legende || "";
    $("lightbox-caption").textContent =
      (photo.legende ? photo.legende + " · " : "") +
      (currentIndex + 1) + " / " + currentAlbum.photos.length;
  }

  function nextPhoto() {
    if (!currentAlbum) return;
    currentIndex = (currentIndex + 1) % currentAlbum.photos.length;
    updateLightbox();
  }

  function prevPhoto() {
    if (!currentAlbum) return;
    currentIndex =
      (currentIndex - 1 + currentAlbum.photos.length) % currentAlbum.photos.length;
    updateLightbox();
  }

  $("lightbox-close").addEventListener("click", closeLightbox);
  $("lightbox-next").addEventListener("click", nextPhoto);
  $("lightbox-prev").addEventListener("click", prevPhoto);

  $("lightbox").addEventListener("click", (e) => {
    if (e.target === $("lightbox")) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if ($("lightbox").classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
  });

  /* ---------- Démarrage ---------- */

  async function init() {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved && saved === CONFIG.passwordHash) {
      openSite();
    } else {
      passwordInput.focus();
    }
  }

  init();
})();
