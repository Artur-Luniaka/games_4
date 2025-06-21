// Footer Injector Module - GameVault Australia
const footerInjectionModule = (() => {
  "use strict";

  const createFooterTemplate = () => {
    return `
            <footer class="site-footer" role="contentinfo">
                <div class="footer-container">
                    <div class="footer-branding">
                        <div class="footer-logo">🕹️ InteractiveLuckCore AU</div>
                    </div>
                    <nav class="footer-links" aria-label="Footer navigation">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="shopping-cart.html">Cart <span class="cart-count-badge" id="footerCartCount">0</span></a></li>
                            <li><a href="index.html#contact-section">Contact Us</a></li>
                            <li><a href="about-us.html">About Us</a></li>
                        </ul>
                    </nav>
                    <nav class="footer-links" aria-label="Footer legal links">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="terms-of-service.html">Terms of Service</a></li>
                            <li><a href="shipping-returns.html">Shipping & Returns</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="footer-bottom">
                    <span>&copy; 2025 InteractiveLuckCore.com | All rights reserved.</span>
                </div>
            </footer>
        `;
  };

  const createFooterStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
            .site-footer {
                background: linear-gradient(135deg, var(--neutral-900), var(--neutral-800));
                color: var(--neutral-100);
                padding: var(--spacing-3xl) 0 var(--spacing-lg) 0;
                font-size: 1rem;
                position: relative;
                z-index: 10;
            }
            .footer-container {
                max-width: var(--container-max-width);
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                gap: var(--spacing-2xl);
                padding: 0 var(--spacing-lg);
            }
            .footer-branding,
            .footer-links {
                flex: 1 1 0;
                min-width: 0;
            }
            .footer-logo {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: var(--spacing-sm);
            }
            .footer-tagline {
                color: var(--neutral-300);
                font-size: 1rem;
                margin-bottom: var(--spacing-lg);
            }
            .footer-links h4 {
                color: var(--neutral-100);
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: var(--spacing-md);
            }
            .footer-links ul {
                list-style: none;
                padding: 0;
                margin: 0 0 var(--spacing-lg) 0;
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }
            .footer-links a {
                color: var(--accent-color);
                text-decoration: none;
                font-weight: 500;
                transition: color var(--transition-fast);
            }
            .footer-links a:hover {
                color: var(--primary-color);
                text-decoration: underline;
            }
            .cart-count-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background-color: var(--primary-color);
                color: var(--neutral-100);
                font-size: 0.75rem;
                font-weight: 700;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                margin-left: var(--spacing-xs);
                transition: transform var(--transition-fast);
            }
            .footer-bottom {
                text-align: center;
                color: var(--neutral-400);
                font-size: 0.9rem;
                margin-top: var(--spacing-xl);
            }
            @media (max-width: 768px) {
                .footer-container {
                    flex-direction: column;
                    gap: var(--spacing-lg);
                    padding: 0 var(--spacing-md);
                }
                .footer-branding {
                    align-items: flex-start;
                }
            }
            @media (max-width: 360px) {
                .footer-container {
                    padding: 0 var(--spacing-xs);
                }
                .footer-logo {
                    font-size: 1.1rem;
                }
            }
        `;
    return style;
  };

  const initializeFooter = () => {
    const footerContainer = document.getElementById("footer-container");
    if (!footerContainer) return;
    footerContainer.innerHTML = createFooterTemplate();
    document.head.appendChild(createFooterStyles());
  };

  const updateFooterCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("gameVaultCart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const footerCartCount = document.getElementById("footerCartCount");
      if (footerCartCount) {
        footerCartCount.textContent = totalItems;
        footerCartCount.style.display = totalItems > 0 ? "inline-flex" : "none";
      }
    } catch (error) {
      console.error("Error updating footer cart count:", error);
    }
  };

  return {
    initialize: () => {
      initializeFooter();
      updateFooterCartCount();
    },
    updateCartCount: updateFooterCartCount,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    footerInjectionModule.initialize
  );
} else {
  footerInjectionModule.initialize();
}

export default footerInjectionModule;
