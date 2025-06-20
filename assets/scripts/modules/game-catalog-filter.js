// Game Catalog Filter Module - GameVault Australia
const gameCatalogFilterModule = (() => {
  "use strict";
  let gamesData = [];
  let filteredGames = [];
  let activeFilters = { platforms: ["Xbox", "PC"] };

  async function initializeGameCatalog() {
    await loadGamesData();
    setupFilterEvents();
    renderGamesGrid();
  }

  async function loadGamesData() {
    try {
      const response = await fetch("assets/data/games-collection-aurora.json");
      gamesData = await response.json();
      filteredGames = [...gamesData];
    } catch (error) {
      console.error("Error loading games data:", error);
      gamesData = [];
      filteredGames = [];
    }
  }

  function setupFilterEvents() {
    const filterToggle = document.getElementById("filterToggle");
    const filterPanel = document.getElementById("filterPanel");
    const applyFiltersBtn = document.getElementById("applyFilters");
    const clearFiltersBtn = document.getElementById("clearFilters");
    const resetFiltersBtn = document.getElementById("resetFilters");

    filterToggle.addEventListener("click", toggleFilterPanel);
    applyFiltersBtn.addEventListener("click", applyFilters);
    clearFiltersBtn.addEventListener("click", clearFilters);
    resetFiltersBtn.addEventListener("click", resetFilters);
  }

  function toggleFilterPanel() {
    const filterToggle = document.getElementById("filterToggle");
    const filterPanel = document.getElementById("filterPanel");
    const isExpanded = filterToggle.getAttribute("aria-expanded") === "true";

    filterToggle.setAttribute("aria-expanded", !isExpanded);
    filterPanel.setAttribute("aria-hidden", isExpanded);
  }

  function applyFilters() {
    const platformCheckboxes = document.querySelectorAll(
      '.filter-option input[type="checkbox"]'
    );
    activeFilters.platforms = Array.from(platformCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    filterGames();
    renderGamesGrid();
    toggleFilterPanel();
  }

  function clearFilters() {
    const platformCheckboxes = document.querySelectorAll(
      '.filter-option input[type="checkbox"]'
    );
    platformCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    activeFilters.platforms = [];
  }

  function resetFilters() {
    const platformCheckboxes = document.querySelectorAll(
      '.filter-option input[type="checkbox"]'
    );
    platformCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
    activeFilters.platforms = ["Xbox", "PC"];
    applyFilters();
  }

  function filterGames() {
    filteredGames = gamesData.filter((game) => {
      const hasMatchingPlatform = game.platform.some((platform) =>
        activeFilters.platforms.includes(platform)
      );
      return hasMatchingPlatform;
    });
  }

  function renderGamesGrid() {
    const gamesGrid = document.getElementById("gamesGrid");
    const noResults = document.getElementById("noResults");

    if (filteredGames.length === 0) {
      gamesGrid.style.display = "none";
      noResults.style.display = "block";
      return;
    }

    gamesGrid.style.display = "grid";
    noResults.style.display = "none";

    gamesGrid.innerHTML = filteredGames
      .map((game) => createGameCard(game))
      .join("");

    // Add event listeners to new cards
    addCardEventListeners();
  }

  function createGameCard(game) {
    const platforms = game.platform.join(", ");
    const features = game.features
      .slice(0, 3)
      .map((feature) => `<span class="game-card-feature">${feature}</span>`)
      .join("");

    return `
            <article class="game-card" data-game-id="${game.id}">
                <div class="game-card-image">
                    <img src="${game.cover}" alt="${game.title}" loading="lazy">
                    <div class="game-card-platform">${platforms}</div>
                </div>
                <div class="game-card-content">
                    <h3 class="game-card-title">${game.title}</h3>
                    <p class="game-card-description">${game.description}</p>
                    <div class="game-card-features">
                        ${features}
                    </div>
                    <div class="game-card-footer">
                        <div class="game-card-info">
                            <div class="game-card-price">$${game.price.toFixed(
                              2
                            )}</div>
                            <div class="game-card-rating">${game.rating}</div>
                        </div>
                        <div class="game-card-actions">
                            <a href="game-details.html?id=${
                              game.id
                            }" class="game-card-btn game-card-btn-secondary">Details</a>
                            <button class="game-card-btn game-card-btn-primary add-to-cart-btn" data-game-id="${
                              game.id
                            }">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
  }

  function addCardEventListeners() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", handleAddToCart);
    });
  }

  function handleAddToCart(event) {
    const gameId = event.target.dataset.gameId;
    const game = gamesData.find((g) => g.id === gameId);

    if (!game) return;

    // Add to cart logic (will be implemented in cart module)
    addGameToCart(game);
    showAddToCartNotification(game.title);
  }

  function addGameToCart(game) {
    try {
      const cart = JSON.parse(localStorage.getItem("gameVaultCart")) || [];
      const existingItem = cart.find((item) => item.id === game.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: game.id,
          title: game.title,
          price: game.price,
          platform: game.platform,
          cover: game.cover,
          quantity: 1,
        });
      }

      localStorage.setItem("gameVaultCart", JSON.stringify(cart));

      // Update cart count in header
      const headerModule = window.headerInjectionModule;
      if (headerModule && headerModule.updateCartCount) {
        headerModule.updateCartCount();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  function showAddToCartNotification(gameTitle) {
    const notification = document.createElement("div");
    notification.className = "add-to-cart-notification";
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span class="notification-text">${gameTitle} added to cart!</span>
            </div>
        `;

    // Add notification styles
    const style = document.createElement("style");
    style.textContent = `
            .add-to-cart-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--secondary-color);
                color: var(--neutral-100);
                padding: var(--spacing-md) var(--spacing-lg);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform var(--transition-normal);
                max-width: 300px;
            }
            .add-to-cart-notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            .notification-icon {
                font-size: 1.25rem;
            }
            .notification-text {
                font-weight: 500;
            }
        `;

    if (!document.querySelector("#notification-styles")) {
      style.id = "notification-styles";
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Hide notification
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Public API
  return {
    initialize: initializeGameCatalog,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    gameCatalogFilterModule.initialize
  );
} else {
  gameCatalogFilterModule.initialize();
}

export default gameCatalogFilterModule;
