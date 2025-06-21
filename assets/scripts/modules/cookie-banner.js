/**
 * Cookie Banner Controller
 * Manages cookie consent banner functionality
 */

class CookieBannerController {
  constructor() {
    this.banner = document.getElementById("cookie-banner");
    this.acceptButton = document.getElementById("accept-cookies");
    this.storageKey = "interactiveLuckCoreCookieConsent";

    this.init();
  }

  init() {
    // Check if user has already accepted cookies
    if (!this.hasUserConsented()) {
      this.showBanner();
      this.bindEvents();
    }
  }

  hasUserConsented() {
    return localStorage.getItem(this.storageKey) === "accepted";
  }

  showBanner() {
    // Small delay to ensure smooth animation
    setTimeout(() => {
      this.banner.classList.add("show");
    }, 500);
  }

  hideBanner() {
    this.banner.classList.remove("show");

    // Remove banner from DOM after animation
    setTimeout(() => {
      if (this.banner && this.banner.parentNode) {
        this.banner.parentNode.removeChild(this.banner);
      }
    }, 300);
  }

  acceptCookies() {
    // Save consent to localStorage
    localStorage.setItem(this.storageKey, "accepted");

    // Hide banner with animation
    this.hideBanner();

    // Optional: Trigger any cookie-dependent functionality
    this.onCookiesAccepted();
  }

  onCookiesAccepted() {
    // You can add any cookie-dependent functionality here
    // For example, enabling analytics, personalization, etc.
    console.log("Cookies accepted - enabling enhanced features");

    // Example: Enable Google Analytics (if you have it)
    // if (typeof gtag !== 'undefined') {
    //   gtag('consent', 'update', {
    //     'analytics_storage': 'granted'
    //   });
    // }
  }

  bindEvents() {
    if (this.acceptButton) {
      this.acceptButton.addEventListener("click", () => {
        this.acceptCookies();
      });
    }
  }
}

// Initialize cookie banner when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CookieBannerController();
});

export default CookieBannerController;
