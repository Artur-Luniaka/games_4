// Game Details Loader Module - GameVault Australia
const gameDetailsLoaderModule = (() => {
  "use strict";
  let currentGame = null;
  let allGames = [];

  async function initializeGameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    if (!gameId) {
      showErrorPage("Game not found");
      return;
    }

    await loadAllGames();
    await loadGameDetails(gameId);
    await loadGameReviews(gameId);
    await loadGameRecommendations(gameId);
    setupEventListeners();
  }

  async function loadAllGames() {
    try {
      const response = await fetch("assets/data/games-collection-aurora.json");
      allGames = await response.json();
    } catch (error) {
      console.error("Error loading games data:", error);
      allGames = [];
    }
  }

  async function loadGameDetails(gameId) {
    currentGame = allGames.find((game) => game.id === gameId);

    if (!currentGame) {
      showErrorPage("Game not found");
      return;
    }

    populateGameDetails();
  }

  function populateGameDetails() {
    // Hero section
    document.getElementById("gameTitle").textContent = currentGame.title;
    document.getElementById("gameCover").src = currentGame.cover;
    document.getElementById("gameCover").alt = currentGame.title;
    document.getElementById("gamePlatform").textContent =
      currentGame.platform.join(", ");
    document.getElementById("gameDescription").textContent =
      currentGame.description;
    document.getElementById(
      "gamePrice"
    ).textContent = `$${currentGame.price.toFixed(2)}`;

    // Rating
    const ratingStars = "⭐".repeat(Math.floor(currentGame.rating));
    document.getElementById("gameRating").textContent = ratingStars;
    document.getElementById(
      "gameRatingValue"
    ).textContent = `${currentGame.rating}/5`;

    // Meta info
    document.getElementById(
      "gameRelease"
    ).textContent = `Released: ${currentGame.releaseDate}`;
    document.getElementById("gameStock").textContent = currentGame.inStock
      ? "In Stock"
      : "Out of Stock";

    // Features
    const featuresContainer = document.getElementById("gameFeatures");
    featuresContainer.innerHTML = currentGame.features
      .map((feature) => `<span class="game-feature-tag">${feature}</span>`)
      .join("");

    // Game information
    document.getElementById("gameDeveloper").textContent =
      currentGame.developer;
    document.getElementById("gamePublisher").textContent =
      currentGame.publisher;
    document.getElementById("gameReleaseDate").textContent =
      currentGame.releaseDate;
    document.getElementById("gamePlatformInfo").textContent =
      currentGame.platform.join(", ");

    // System requirements (only for PC games)
    const systemReqSection = document.getElementById(
      "systemRequirementsSection"
    );
    const systemReqContainer = document.getElementById("systemRequirements");

    if (currentGame.platform.includes("PC") && currentGame.systemRequirements) {
      systemReqContainer.innerHTML = `
                <div class="system-req-item">
                    <div class="system-req-title">Minimum Requirements</div>
                    <div class="system-req-content">${currentGame.systemRequirements.minimum}</div>
                </div>
                <div class="system-req-item">
                    <div class="system-req-title">Recommended Requirements</div>
                    <div class="system-req-content">${currentGame.systemRequirements.recommended}</div>
                </div>
            `;
      systemReqSection.style.display = "block";
    } else {
      systemReqSection.style.display = "none";
    }

    // Populate game gallery
    const gameGallery = document.getElementById("gameGallery");
    if (currentGame.gallery && currentGame.gallery.length > 0) {
      gameGallery.innerHTML = `
        <div class="gallery-item">
          <img src="${currentGame.gallery[0]}" alt="${currentGame.title} screenshot" loading="lazy" />
        </div>
      `;
    } else {
      gameGallery.innerHTML = "<p>No images available.</p>";
    }

    // Update page title
    document.title = `${currentGame.title} - InteractiveLuckCore.com`;
  }

  async function loadGameReviews(gameId) {
    try {
      const reviewsFile = `assets/data/reviews-${gameId
        .split("-")
        .slice(1)
        .join("-")}.json`;
      const response = await fetch(reviewsFile);
      const reviews = await response.json();

      populateReviews(reviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
      populateReviews([]);
    }
  }

  function populateReviews(reviews) {
    const reviewsContainer = document.getElementById("reviewsContainer");

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = "<p>No reviews available yet.</p>";
      return;
    }

    reviewsContainer.innerHTML = reviews
      .map(
        (review) => `
            <div class="review-item">
                <div class="review-header">
                    <img src="${review.avatar}" alt="${
          review.user
        }" class="review-avatar">
                    <div class="review-info">
                        <div class="review-user">${review.user}</div>
                        <div class="review-rating">${"⭐".repeat(
                          review.rating
                        )}</div>
                        <div class="review-date">${formatDate(
                          review.date
                        )}</div>
                    </div>
                </div>
                <div class="review-text">${review.text}</div>
                <div class="review-platform">${review.platform}</div>
            </div>
        `
      )
      .join("");
  }

  async function loadGameRecommendations(gameId) {
    try {
      const recoFile = `assets/data/reco-${gameId
        .split("-")
        .slice(1)
        .join("-")}.json`;
      const response = await fetch(recoFile);
      const recommendations = await response.json();

      populateRecommendations(recommendations);
    } catch (error) {
      console.error("Error loading recommendations:", error);
      // Fallback: generate random recommendations
      generateRandomRecommendations(gameId);
    }
  }

  function populateRecommendations(recommendations) {
    const recommendationsGrid = document.getElementById("recommendationsGrid");

    recommendationsGrid.innerHTML = recommendations
      .map(
        (game) => `
            <a href="game-details.html?id=${
              game.id
            }" class="recommendation-card">
                <div class="recommendation-image">
                    <img src="${game.cover}" alt="${game.title}" loading="lazy">
                </div>
                <div class="recommendation-content">
                    <h4 class="recommendation-title">${game.title}</h4>
                    <div class="recommendation-platform">${game.platform.join(
                      ", "
                    )}</div>
                    <div class="recommendation-price">$${game.price.toFixed(
                      2
                    )}</div>
                </div>
            </a>
        `
      )
      .join("");
  }

  function generateRandomRecommendations(excludeGameId) {
    const availableGames = allGames.filter((game) => game.id !== excludeGameId);
    const shuffled = availableGames.sort(() => 0.5 - Math.random());
    const randomRecommendations = shuffled.slice(0, 3);

    populateRecommendations(randomRecommendations);
  }

  function setupEventListeners() {
    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.addEventListener("click", handleAddToCart);
  }

  function handleAddToCart() {
    if (!currentGame) return;

    addGameToCart(currentGame);
    showAddToCartNotification(currentGame.title);
  }

  function addGameToCart(game) {
    try {
      const cart =
        JSON.parse(localStorage.getItem("interactiveLuckCoreCart")) || [];
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

      localStorage.setItem("interactiveLuckCoreCart", JSON.stringify(cart));

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function showErrorPage(message) {
    document.body.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <h1>${message}</h1>
                <p>The game you're looking for doesn't exist or has been removed.</p>
                <a href="game-catalog.html" style="color: var(--primary-color); text-decoration: none;">
                    ← Back to Game Catalog
                </a>
            </div>
        `;
  }

  // Public API
  return {
    initialize: initializeGameDetails,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    gameDetailsLoaderModule.initialize
  );
} else {
  gameDetailsLoaderModule.initialize();
}

export default gameDetailsLoaderModule;
