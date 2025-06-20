// Header Injector Module - GameVault Australia
const headerInjectionModule = (() => {
  "use strict";

  // Header HTML template with unique burger menu design
  const createHeaderTemplate = () => {
    return `
            <header class="site-header" role="banner">
                <div class="header-container">
                    <div class="header-logo">
                        <a href="index.html" aria-label="GameVault Australia Home">
                            <div class="logo-visual">
                                <div class="logo-icon">🎮</div>
                                <div class="logo-text">
                                    <span class="logo-title">GameVault</span>
                                    <span class="logo-subtitle">Australia</span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <nav class="header-navigation" role="navigation" aria-label="Main navigation">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link" aria-current="page">Home</a>
                            </li>
                            <li class="nav-item">
                                <a href="game-catalog.html" class="nav-link">Games</a>
                            </li>
                            <li class="nav-item">
                                <a href="shopping-cart.html" class="nav-link cart-link">
                                    Cart
                                    <span class="cart-count" id="cartItemCount">0</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div class="header-actions">
                        <button class="mobile-menu-toggle" 
                                aria-label="Toggle mobile menu" 
                                aria-expanded="false"
                                aria-controls="mobileMenu">
                            <div class="burger-container">
                                <div class="burger-line burger-line-1"></div>
                                <div class="burger-line burger-line-2"></div>
                                <div class="burger-line burger-line-3"></div>
                                <div class="burger-circle"></div>
                            </div>
                        </button>
                    </div>
                </div>

                <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
                    <div class="mobile-menu-container">
                        <ul class="mobile-nav-menu">
                            <li class="mobile-nav-item">
                                <a href="index.html" class="mobile-nav-link" aria-current="page">
                                    <span class="mobile-nav-icon">🏠</span>
                                    Home
                                </a>
                            </li>
                            <li class="mobile-nav-item">
                                <a href="game-catalog.html" class="mobile-nav-link">
                                    <span class="mobile-nav-icon">🎮</span>
                                    Games
                                </a>
                            </li>
                            <li class="mobile-nav-item">
                                <a href="shopping-cart.html" class="mobile-nav-link">
                                    <span class="mobile-nav-icon">🛒</span>
                                    Cart
                                    <span class="mobile-cart-count" id="mobileCartCount">0</span>
                                </a>
                            </li>
                        </ul>
                        
                        <div class="mobile-menu-footer">
                            <div class="mobile-contact-info">
                                <p>📧 hello@gamevault.com.au</p>
                                <p>📱 +61 2 1234 5678</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
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
                max-width: var(--container-max-width);
                margin: 0 auto;
                padding: 0 var(--spacing-lg);
                height: var(--header-height);
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
            .header-navigation {
                display: flex;
                align-items: center;
            }

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

            /* Mobile Menu Toggle */
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: var(--spacing-sm);
                border-radius: var(--radius-md);
                transition: all var(--transition-fast);
            }

            .mobile-menu-toggle:hover {
                background: rgba(230, 126, 34, 0.1);
            }

            .burger-container {
                position: relative;
                width: 30px;
                height: 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .burger-line {
                width: 20px;
                height: 2px;
                background: var(--neutral-700);
                border-radius: 1px;
                transition: all var(--transition-normal);
                position: absolute;
            }

            .burger-line-1 {
                transform: translateY(-6px);
            }

            .burger-line-2 {
                transform: translateY(0);
            }

            .burger-line-3 {
                transform: translateY(6px);
            }

            .burger-circle {
                position: absolute;
                width: 30px;
                height: 30px;
                border: 2px solid transparent;
                border-radius: 50%;
                transition: all var(--transition-normal);
            }

            /* Active burger state */
            .mobile-menu-toggle[aria-expanded="true"] .burger-line-1 {
                transform: translateY(0) rotate(45deg);
            }

            .mobile-menu-toggle[aria-expanded="true"] .burger-line-2 {
                opacity: 0;
                transform: translateX(-10px);
            }

            .mobile-menu-toggle[aria-expanded="true"] .burger-line-3 {
                transform: translateY(0) rotate(-45deg);
            }

            .mobile-menu-toggle[aria-expanded="true"] .burger-circle {
                border-color: var(--primary-color);
                transform: scale(1.2);
            }

            /* Mobile Menu */
            .mobile-menu {
                position: fixed;
                top: var(--header-height);
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                transform: translateX(-100%);
                transition: transform var(--transition-normal);
                z-index: 999;
            }

            .mobile-menu.active {
                transform: translateX(0);
            }

            .mobile-menu-container {
                background: var(--neutral-100);
                height: 100%;
                max-width: 300px;
                padding: var(--spacing-xl);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .mobile-nav-menu {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .mobile-nav-item {
                margin-bottom: var(--spacing-md);
            }

            .mobile-nav-link {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                padding: var(--spacing-md);
                color: var(--neutral-700);
                text-decoration: none;
                border-radius: var(--radius-md);
                transition: all var(--transition-fast);
                font-weight: 500;
            }

            .mobile-nav-link:hover {
                background: rgba(230, 126, 34, 0.1);
                color: var(--primary-color);
                transform: translateX(5px);
            }

            .mobile-nav-icon {
                font-size: 1.25rem;
                width: 24px;
                text-align: center;
            }

            .mobile-cart-count {
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
                margin-left: auto;
            }

            .mobile-menu-footer {
                border-top: 1px solid var(--neutral-300);
                padding-top: var(--spacing-lg);
            }

            .mobile-contact-info p {
                color: var(--neutral-600);
                font-size: 0.875rem;
                margin-bottom: var(--spacing-xs);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .header-navigation {
                    display: none;
                }

                .mobile-menu-toggle {
                    display: block;
                }

                .header-container {
                    padding: 0 var(--spacing-md);
                }

                .logo-title {
                    font-size: 1.25rem;
                }

                .logo-subtitle {
                    font-size: 0.625rem;
                }

                .logo-icon {
                    font-size: 1.5rem;
                }
            }

            @media (max-width: 360px) {
                .header-container {
                    padding: 0 var(--spacing-sm);
                }

                .logo-title {
                    font-size: 1.125rem;
                }

                .logo-subtitle {
                    font-size: 0.5rem;
                }

                .logo-icon {
                    font-size: 1.25rem;
                }

                .burger-container {
                    width: 25px;
                    height: 25px;
                }

                .burger-line {
                    width: 16px;
                }

                .burger-circle {
                    width: 25px;
                    height: 25px;
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

  // Initialize header functionality
  const initializeHeader = () => {
    const headerContainer = document.getElementById("header-container");
    if (!headerContainer) return;

    // Inject header HTML
    headerContainer.innerHTML = createHeaderTemplate();

    // Inject header styles
    document.head.appendChild(createHeaderStyles());

    // Initialize mobile menu functionality
    initializeMobileMenu();

    // Initialize scroll effects
    initializeScrollEffects();

    // Update cart count from localStorage
    updateCartCount();
  };

  // Mobile menu functionality
  const initializeMobileMenu = () => {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const body = document.body;

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.setAttribute("aria-hidden", isExpanded);

      if (!isExpanded) {
        mobileMenu.classList.add("active");
        body.style.overflow = "hidden";
      } else {
        mobileMenu.classList.remove("active");
        body.style.overflow = "";
      }
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        menuToggle.click();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        menuToggle.click();
      }
    });
  };

  // Scroll effects
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

  // Update cart count
  const updateCartCount = () => {
    try {
      const cartData = JSON.parse(localStorage.getItem("gameVaultCart")) || [];
      const cartCount = cartData.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );

      const cartCountElements = document.querySelectorAll(
        "#cartItemCount, #mobileCartCount"
      );
      cartCountElements.forEach((element) => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? "flex" : "none";
      });
    } catch (error) {
      console.warn("Error updating cart count:", error);
    }
  };

  // Public API
  return {
    initialize: initializeHeader,
    updateCartCount: updateCartCount,
  };
})();

// Initialize header when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    headerInjectionModule.initialize
  );
} else {
  headerInjectionModule.initialize();
}

// Export for use in other modules
export default headerInjectionModule;
