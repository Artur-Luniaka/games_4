// Hero Gallery Controller - GameVault Australia
const galleryCycloneModule = (() => {
  "use strict";
  let currentSlide = 0;
  let slides = [];
  let indicators = [];
  let autoTimer = null;
  const AUTO_INTERVAL = 5000;

  function initializeGalleryCyclone() {
    slides = Array.from(document.querySelectorAll(".gallery-slide"));
    indicators = Array.from(document.querySelectorAll(".indicator"));
    if (!slides.length) return;
    attachGalleryEvents();
    showGallerySlide(0);
    startAutoCyclone();
  }

  function attachGalleryEvents() {
    document.querySelector(".prev-slide").addEventListener("click", () => {
      showGallerySlide(currentSlide - 1);
      restartAutoCyclone();
    });
    document.querySelector(".next-slide").addEventListener("click", () => {
      showGallerySlide(currentSlide + 1);
      restartAutoCyclone();
    });
    indicators.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        showGallerySlide(idx);
        restartAutoCyclone();
      });
    });
  }

  function showGallerySlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  function startAutoCyclone() {
    autoTimer = setInterval(() => {
      showGallerySlide(currentSlide + 1);
    }, AUTO_INTERVAL);
  }

  function restartAutoCyclone() {
    clearInterval(autoTimer);
    startAutoCyclone();
  }

  // Accessibility: pause on focus
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(autoTimer);
    } else {
      restartAutoCyclone();
    }
  });

  // Public API
  return {
    initialize: initializeGalleryCyclone,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    galleryCycloneModule.initialize
  );
} else {
  galleryCycloneModule.initialize();
}

export default galleryCycloneModule;
