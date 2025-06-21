// Header Injector Module - GameVault Australia
const headerInjectionModule = (() => {
  "use strict";

  // Header HTML template
  const createHeaderTemplate = () => {
    return `
            <header class="site-header" role="banner" id="mainHeader">
                <div class="header-container">
                    <div class="header-logo">
                        <a href="./" aria-label="InteractiveLuckCore Australia Home">
                            <div class="logo-visual">
                                <div class="logo-icon">🕹️</div>
                                <div class="logo-text">
                                    <span class="logo-title">InteractiveLuckCore</span>
                                    <span class="logo-subtitle">Australia</span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="header-right">
                        <nav class="header-navigation" role="navigation" aria-label="Main navigation">
                            <ul class="nav-menu">
                                <li class="nav-item">
                                    <a href="./" class="nav-link" data-link-type="page">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a href="game-catalog.html" class="nav-link" data-link-type="page">Games</a>
                                </li>
                                <li class="nav-item">
                                    <a href="./#expert-picks" class="nav-link" data-link-type="anchor">Expert Picks</a>
                                </li>
                                <li class="nav-item">
                                    <a href="./#customer-stories" class="nav-link" data-link-type="anchor">Stories</a>
                                </li>
                            </ul>
                        </nav>

                        <div class="header-actions">
                            <a href="shopping-cart.html" class="nav-link cart-link desktop-cart" data-link-type="page">
                                Cart
                                <span class="cart-count" id="cartItemCount">0</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        `;
  };

  // Mobile Menu Toggle Button HTML template
  const createToggleTemplate = () => {
    return `
            <button class="mobile-menu-toggle" 
                    aria-label="Toggle mobile menu" 
                    aria-expanded="false"
                    aria-controls="mobileMenu">
                <div class="burger-container">
                    <div class="burger-line burger-line-1"></div>
                    <div class="burger-line burger-line-2"></div>
                    <div class="burger-line burger-line-3"></div>
                </div>
            </button>
        `;
  };

  // Mobile Menu HTML template, to be injected separately
  const createMobileMenuTemplate = () => {
    return `
            <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
                <div class="mobile-menu-container">
                    <ul class="mobile-nav-menu">
                        <li class="mobile-nav-item">
                            <a href="./" class="mobile-nav-link" data-link-type="page">
                                <span class="mobile-nav-icon">🏠</span>
                                Home
                            </a>
                        </li>
                        <li class="mobile-nav-item">
                            <a href="game-catalog.html" class="mobile-nav-link" data-link-type="page">
                                <span class="mobile-nav-icon">🎮</span>
                                Games
                            </a>
                        </li>
                        <li class="mobile-nav-item">
                            <a href="./#expert-picks" class="mobile-nav-link" data-link-type="anchor">
                                <span class="mobile-nav-icon">⭐</span>
                                Expert Picks
                            </a>
                        </li>
                        <li class="mobile-nav-item">
                            <a href="./#customer-stories" class="mobile-nav-link" data-link-type="anchor">
                                <span class="mobile-nav-icon">💬</span>
                                Stories
                            </a>
                        </li>
                        <li class="mobile-nav-item">
                            <a href="shopping-cart.html" class="mobile-nav-link" data-link-type="page">
                                <span class="mobile-nav-icon">🛒</span>
                                Cart
                                <span class="mobile-cart-count" id="mobileCartCount">0</span>
                            </a>
                        </li>
                    </ul>
                    <div class="mobile-menu-footer">
                        <div class="mobile-contact-info">
                            <p>📧 support@interactiveluckcore.com</p>
                            <p>📱 +61 2 0073 6611</p>
                        </div>
                        <div class="mobile-social-links">
                            <!-- Add social links here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
  };

  // Header styles with unique design
  const createHeaderStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
            /* Header Styles - GameVault Australia */
            .site-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(230, 126, 34, 0.1);
                transition: all var(--transition-normal);
            }

            .site-header.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: var(--shadow-lg);
            }

            .header-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin: 0 auto;
                padding: 0 var(--spacing-lg);
                height: var(--header-height);
            }

            .header-right {
                display: flex;
                align-items: center;
                gap: var(--spacing-xl);
            }
            
            .header-logo {
                flex-shrink: 0;
            }

            .header-navigation {
                /* This class is now mainly a semantic wrapper */
            }

            .header-actions {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
            }

            /* Logo Styles */
            .header-logo a {
                text-decoration: none;
                color: inherit;
            }

            .logo-visual {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }

            .logo-icon {
                font-size: 2rem;
                animation: pulse 2s infinite;
            }

            .logo-text {
                display: flex;
                flex-direction: column;
                line-height: 1;
            }

            .logo-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
                letter-spacing: -0.5px;
            }

            .logo-subtitle {
                font-size: 0.75rem;
                color: var(--neutral-600);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            /* Navigation Styles */
            .nav-menu {
                display: flex;
                list-style: none;
                gap: var(--spacing-xl);
                margin: 0;
                padding: 0;
            }

            .nav-link {
                position: relative;
                color: var(--neutral-700);
                text-decoration: none;
                font-weight: 500;
                padding: var(--spacing-sm) var(--spacing-md);
                border-radius: var(--radius-md);
                transition: all var(--transition-fast);
            }

            .nav-link::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 2px;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                transition: all var(--transition-normal);
                transform: translateX(-50%);
            }

            .nav-link:hover::before,
            .nav-link[aria-current="page"]::before {
                width: 100%;
            }

            .nav-link:hover {
                color: var(--primary-color);
                background: rgba(230, 126, 34, 0.1);
            }

            .nav-link[aria-current="page"] {
                color: var(--primary-color);
                background: rgba(230, 126, 34, 0.1);
                font-weight: 700;
            }

            .cart-link {
                position: relative;
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
            }

            .cart-count {
                background: var(--primary-color);
                color: var(--neutral-100);
                font-size: 0.75rem;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 50%;
                min-width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: pulse 2s infinite;
            }

            /* --- Mobile Menu Toggle & Burger Icon --- */
            .mobile-menu-toggle {
                display: none; /* Hidden by default */
                position: fixed;
                top: 18px; /* Adjust to vertically center in header */
                right: var(--spacing-lg); /* Align with header padding */
                background: transparent;
                border: 1px solid transparent;
                width: 44px;
                height: 44px;
                padding: 10px;
                cursor: pointer;
                z-index: 1002; /* Above everything */
                transition: border-color 0.3s ease;
                border-radius: var(--radius-sm);
            }

            .burger-container {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .burger-line {
                position: absolute;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: var(--neutral-800);
                border-radius: 3px;
                transition: transform 0.3s ease, background-color 0.3s ease;
            }

            .burger-line-1 { top: 0; }
            .burger-line-2 { top: 50%; transform: translateY(-50%); }
            .burger-line-3 { bottom: 0; }

            /* Animate to 'X' */
            .mobile-menu-toggle[aria-expanded="true"] {
                border-color: var(--neutral-400);
            }

            .mobile-menu-toggle[aria-expanded="true"] .burger-line-1 {
                transform: translateY(8.5px) rotate(45deg);
            }

            .mobile-menu-toggle[aria-expanded="true"] .burger-line-2 {
                transform: scaleX(0);
                transition: transform 0.15s ease;
            }

            .mobile-menu-toggle[aria-expanded="true"] .burger-line-3 {
                transform: translateY(-8.5px) rotate(-45deg);
            }

            /* --- Full-Screen Mobile Menu Overlay --- */
            .mobile-menu {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--neutral-100);
                z-index: 1001; /* Below toggle, above header */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                opacity: 0;
                visibility: hidden;
                transform: scale(1.05);
                transition: opacity 0.3s ease, visibility 0s 0.3s, transform 0.3s ease;
            }

            .mobile-menu.active {
                opacity: 1;
                visibility: visible;
                transform: scale(1);
                transition: opacity 0.3s ease, visibility 0s 0s, transform 0.3s ease;
            }

            .mobile-menu-container {
                text-align: center;
            }

            .mobile-nav-menu {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .mobile-nav-item {
                margin: var(--spacing-md) 0;
            }

            .mobile-nav-link {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                font-size: 1.8rem;
                font-weight: 500;
                color: var(--neutral-700);
                text-decoration: none;
                padding: var(--spacing-sm);
                transition: color 0.2s ease;
            }

            .mobile-nav-link:hover,
            .mobile-nav-link.active {
                color: var(--primary-color);
            }

            .mobile-nav-icon {
                font-size: 1.6rem;
                color: var(--neutral-500);
            }
            
            .mobile-cart-count {
                background: var(--primary-color);
                color: white;
                font-size: 1rem;
                border-radius: 50%;
                padding: 0.2em 0.5em;
                margin-left: var(--spacing-sm);
            }

            .mobile-menu-footer {
                position: absolute;
                bottom: var(--spacing-xl);
                text-align: center;
                color: var(--neutral-500);
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .header-navigation, .desktop-cart {
                    display: none;
                }
                .mobile-menu-toggle {
                    display: block;
                }
            }

            /* Accessibility */
            .mobile-menu-toggle:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }

            .nav-link:focus,
            .mobile-nav-link:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .site-header {
                    background: var(--neutral-100);
                    border-bottom: 2px solid var(--neutral-900);
                }

                .nav-link {
                    border: 1px solid transparent;
                }

                .nav-link:hover,
                .nav-link[aria-current="page"] {
                    border-color: var(--primary-color);
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .site-header,
                .nav-link,
                .mobile-menu,
                .burger-line,
                .burger-circle {
                    transition: none;
                }

                .mobile-nav-link:hover {
                    transform: none;
                }

                .logo-icon {
                    animation: none;
                }

                .cart-count {
                    animation: none;
                }
            }
        `;
    return style;
  };

  const initializeHeader = () => {
    updateCartCount();
    initializeMobileMenu();
    initializeScrollEffects();
    setActiveLink();
    setupScrollSpy();
    setupAnchorScroll();
  };

  const setupAnchorScroll = () => {
    document
      .querySelectorAll(
        '.nav-link[data-link-type="anchor"], .mobile-nav-link[data-link-type="anchor"]'
      )
      .forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          const [path, targetId] = href.split("#");

          const isHomePage =
            window.location.pathname.endsWith("/") ||
            window.location.pathname.endsWith("/index.html") ||
            window.location.pathname === "";

          if (
            (path === "index.html" || path === "") &&
            isHomePage &&
            targetId
          ) {
            e.preventDefault();
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
              const headerOffset =
                document.querySelector(".site-header").offsetHeight;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });

              // Close mobile menu if open
              const mobileMenu = document.getElementById("mobileMenu");
              if (mobileMenu.classList.contains("active")) {
                const mobileMenuToggle = document.querySelector(
                  ".mobile-menu-toggle"
                );
                mobileMenuToggle.click();
              }
            }
          }
        });
      });
  };

  const initializeMobileMenu = () => {
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!toggleButton || !mobileMenu) return;

    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      const newIsExpanded = !isExpanded;

      toggleButton.setAttribute("aria-expanded", newIsExpanded);
      mobileMenu.setAttribute("aria-hidden", !newIsExpanded);
      mobileMenu.classList.toggle("active");

      document.body.style.overflow = newIsExpanded ? "hidden" : "";
    });

    // Close mobile menu when any mobile menu link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll(".mobile-nav-link");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Close mobile menu
        toggleButton.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  };

  const initializeScrollEffects = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
  };

  const updateCartCount = () => {
    try {
      const cart =
        JSON.parse(localStorage.getItem("interactiveLuckCoreCart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

      const headerCount = document.getElementById("cartItemCount");
      const mobileCount = document.getElementById("mobileCartCount");

      if (headerCount) {
        headerCount.textContent = totalItems;
        headerCount.style.display = totalItems > 0 ? "inline-flex" : "none";
      }
      if (mobileCount) {
        mobileCount.textContent = totalItems;
        mobileCount.style.display = totalItems > 0 ? "inline-flex" : "none";
      }

      // Also update footer cart count if the module is available
      if (
        window.footerInjectionModule &&
        window.footerInjectionModule.updateCartCount
      ) {
        window.footerInjectionModule.updateCartCount();
      }
    } catch (error) {
      console.error("Error updating cart counts:", error);
    }
  };

  const setActiveLink = () => {
    const currentPage = window.location.pathname.split("/").pop() || "./";
    const isHomePage =
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/") ||
      currentPage === "./";

    document
      .querySelectorAll(".nav-link")
      .forEach((link) => link.removeAttribute("aria-current"));

    // Highlight page links
    const pageLink = document.querySelector(
      `.nav-link[data-link-type="page"][href$="${currentPage}"]`
    );
    if (pageLink) {
      pageLink.setAttribute("aria-current", "page");
    } else if (currentPage === "./") {
      // Fallback for root path
      const homeLink = document.querySelector(
        '.nav-link[data-link-type="page"][href="./"]'
      );
      if (homeLink) homeLink.setAttribute("aria-current", "page");
    }

    if (currentPage === "./") {
      setupScrollSpy();
    }
  };

  const setupScrollSpy = () => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const anchorLinks = document.querySelectorAll(
      '.nav-link[data-link-type="anchor"]'
    );
    const homeLink = document.querySelector(
      '.nav-link[data-link-type="page"][href="./"]'
    );
    const headerHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height"
        ),
        10
      ) || 80;

    const onScroll = () => {
      const scrollPosition = window.scrollY + headerHeight;
      let currentSectionId = null;

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSectionId = section.id;
        }
      });

      let activeLinkFound = false;
      anchorLinks.forEach((link) => {
        const sectionId = link
          .getAttribute("href")
          .substring(link.getAttribute("href").indexOf("#") + 1);
        if (sectionId === currentSectionId) {
          link.setAttribute("aria-current", "page");
          activeLinkFound = true;
        } else {
          link.removeAttribute("aria-current");
        }
      });

      // If no section is active, highlight Home link, otherwise remove its highlight
      if (homeLink) {
        if (!activeLinkFound) {
          homeLink.setAttribute("aria-current", "page");
        } else {
          homeLink.removeAttribute("aria-current");
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Run on load
  };

  document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
      headerContainer.innerHTML = createHeaderTemplate();

      // Inject menu and a SEPARATE toggle button into the body
      document.body.insertAdjacentHTML("beforeend", createMobileMenuTemplate());
      document.body.insertAdjacentHTML("beforeend", createToggleTemplate());

      const dynamicStyles = createHeaderStyles();
      document.head.appendChild(dynamicStyles);

      initializeHeader();
    }
  });

  // Expose functions to other modules if needed
  window.headerInjectionModule = {
    updateCartCount,
  };
})();
