// Footer Injector Module - GameVault Australia
const footerInjectionModule = (() => {
  "use strict";

  const createFooterTemplate = () => {
    return `
            <footer class="site-footer" role="contentinfo">
                <div class="footer-container">
                    <div class="footer-branding">
                        <div class="footer-logo">🎮 GameVault AU</div>
                        <p class="footer-tagline">Premium Xbox & PC Games for Australia</p>
                    </div>
                    <nav class="footer-links" aria-label="Footer navigation">
                        <ul>
                            <li><a href="privacy-essence.html">Privacy Policy</a></li>
                            <li><a href="terms-accord.html">Terms of Service</a></li>
                            <li><a href="refund-clarity.html">Return & Refund Policy</a></li>
                            <li><a href="shipping-journey.html">Shipping & Delivery</a></li>
                        </ul>
                    </nav>
                    <div class="footer-contacts">
                        <div class="footer-contact-item">📧 hello@gamevault.com.au</div>
                        <div class="footer-contact-item">🏢 123 Gaming Street, Sydney NSW 2000</div>
                        <div class="footer-contact-item">🌏 Australia</div>
                        <div class="footer-socials">
                            <a href="#" aria-label="Facebook">Facebook</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="Instagram">Instagram</a>
                            <a href="#" aria-label="Discord">Discord</a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>&copy; 2024 GameVault Australia. All rights reserved.</span>
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
                justify-content: space-between;
                align-items: flex-start;
                gap: var(--spacing-2xl);
                padding: 0 var(--spacing-lg);
            }
            .footer-branding {
                flex: 1 1 200px;
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
            .footer-contacts {
                flex: 1 1 200px;
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }
            .footer-contact-item {
                color: var(--neutral-200);
                font-size: 0.95rem;
            }
            .footer-socials {
                margin-top: var(--spacing-sm);
                display: flex;
                gap: var(--spacing-md);
            }
            .footer-socials a {
                color: var(--accent-color);
                font-size: 1.1rem;
                transition: color var(--transition-fast);
            }
            .footer-socials a:hover {
                color: var(--primary-color);
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
                .footer-branding, .footer-contacts {
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

  return { initialize: initializeFooter };
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
