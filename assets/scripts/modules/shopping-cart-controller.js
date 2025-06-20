// Shopping Cart Controller Module - GameVault Australia
const shoppingCartControllerModule = (() => {
  "use strict";
  let cartItems = [];
  const SHIPPING_THRESHOLD = 100; // Free shipping over $100
  const SHIPPING_COST = 9.99;

  function initializeShoppingCart() {
    loadCartFromStorage();
    renderCartItems();
    updateCartSummary();
    setupEventListeners();
  }

  function loadCartFromStorage() {
    try {
      const storedCart = localStorage.getItem("gameVaultCart");
      cartItems = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      cartItems = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem("gameVaultCart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }

  function setupEventListeners() {
    const checkoutBtn = document.getElementById("checkoutBtn");
    checkoutBtn.addEventListener("click", handleCheckout);
  }

  function renderCartItems() {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const emptyCart = document.getElementById("emptyCart");
    const cartCount = document.getElementById("cartCount");

    if (cartItems.length === 0) {
      cartItemsContainer.style.display = "none";
      emptyCart.style.display = "block";
      cartCount.textContent = "0 items";
      return;
    }

    cartItemsContainer.style.display = "block";
    emptyCart.style.display = "none";

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

    cartItemsContainer.innerHTML = cartItems
      .map((item) => createCartItemHTML(item))
      .join("");

    // Add event listeners to new cart items
    addCartItemEventListeners();
  }

  function createCartItemHTML(item) {
    const itemTotal = (item.price * item.quantity).toFixed(2);

    return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.cover}" alt="${item.title}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <div class="cart-item-platform">${item.platform.join(
                      ", "
                    )}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn quantity-decrease" data-item-id="${
                      item.id
                    }" ${item.quantity <= 1 ? "disabled" : ""}>
                        −
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn quantity-increase" data-item-id="${
                      item.id
                    }">
                        +
                    </button>
                </div>
                <div class="cart-item-total">$${itemTotal}</div>
                <button class="cart-item-remove" data-item-id="${item.id}">
                    Remove
                </button>
            </div>
        `;
  }

  function addCartItemEventListeners() {
    // Quantity buttons
    const decreaseBtns = document.querySelectorAll(".quantity-decrease");
    const increaseBtns = document.querySelectorAll(".quantity-increase");
    const removeBtns = document.querySelectorAll(".cart-item-remove");

    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", handleQuantityDecrease);
    });

    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", handleQuantityIncrease);
    });

    removeBtns.forEach((btn) => {
      btn.addEventListener("click", handleRemoveItem);
    });
  }

  function handleQuantityDecrease(event) {
    const itemId = event.target.dataset.itemId;
    updateItemQuantity(itemId, -1);
  }

  function handleQuantityIncrease(event) {
    const itemId = event.target.dataset.itemId;
    updateItemQuantity(itemId, 1);
  }

  function updateItemQuantity(itemId, change) {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) return;

    const newQuantity = cartItems[itemIndex].quantity + change;

    if (newQuantity <= 0) {
      removeCartItem(itemId);
      return;
    }

    cartItems[itemIndex].quantity = newQuantity;
    saveCartToStorage();

    // Update the specific item in the DOM
    updateCartItemDisplay(itemId, newQuantity);
    updateCartSummary();

    // Add animation
    const quantityDisplay = document.querySelector(
      `[data-item-id="${itemId}"] .quantity-display`
    );
    quantityDisplay.classList.add("quantity-updating");
    setTimeout(() => {
      quantityDisplay.classList.remove("quantity-updating");
    }, 300);

    // Update header cart count
    updateHeaderCartCount();
  }

  function updateCartItemDisplay(itemId, newQuantity) {
    const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
    if (!cartItem) return;

    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    const quantityDisplay = cartItem.querySelector(".quantity-display");
    const decreaseBtn = cartItem.querySelector(".quantity-decrease");
    const itemTotal = cartItem.querySelector(".cart-item-total");

    quantityDisplay.textContent = newQuantity;
    itemTotal.textContent = `$${(item.price * newQuantity).toFixed(2)}`;
    decreaseBtn.disabled = newQuantity <= 1;
  }

  function handleRemoveItem(event) {
    const itemId = event.target.dataset.itemId;
    removeCartItem(itemId);
  }

  function removeCartItem(itemId) {
    const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
    if (cartItem) {
      cartItem.classList.add("removing");

      setTimeout(() => {
        cartItems = cartItems.filter((item) => item.id !== itemId);
        saveCartToStorage();
        renderCartItems();
        updateCartSummary();
        updateHeaderCartCount();
        showRemoveNotification();
      }, 300);
    }
  }

  function updateCartSummary() {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent =
      shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;

    // Enable/disable checkout button
    const checkoutBtn = document.getElementById("checkoutBtn");
    checkoutBtn.disabled = cartItems.length === 0;

    // Add shipping threshold indicator
    const shippingElement = document.getElementById("shipping");
    if (subtotal > 0 && subtotal < SHIPPING_THRESHOLD) {
      const remaining = SHIPPING_THRESHOLD - subtotal;
      shippingElement.title = `Add $${remaining.toFixed(
        2
      )} more for free shipping`;
    } else if (shipping === 0) {
      shippingElement.title = "Free shipping applied";
    }
  }

  function updateHeaderCartCount() {
    const headerModule = window.headerInjectionModule;
    if (headerModule && headerModule.updateCartCount) {
      headerModule.updateCartCount();
    }
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      showNotification("Your cart is empty", "error");
      return;
    }

    // Store cart data for checkout page
    try {
      sessionStorage.setItem("checkoutCart", JSON.stringify(cartItems));
      window.location.href = "checkout.html";
    } catch (error) {
      console.error("Error preparing checkout:", error);
      showNotification("Error preparing checkout", "error");
    }
  }

  function showRemoveNotification() {
    showNotification("Item removed from cart", "success");
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `cart-notification cart-notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${
                  type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
                }</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

    // Add notification styles if not already present
    if (!document.querySelector("#cart-notification-styles")) {
      const style = document.createElement("style");
      style.id = "cart-notification-styles";
      style.textContent = `
                .cart-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    transform: translateX(100%);
                    transition: transform var(--transition-normal);
                    max-width: 300px;
                    color: var(--neutral-100);
                }
                .cart-notification-success {
                    background: var(--secondary-color);
                }
                .cart-notification-error {
                    background: var(--error-color);
                }
                .cart-notification-info {
                    background: var(--primary-color);
                }
                .cart-notification.show {
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
    initialize: initializeShoppingCart,
    getCartItems: () => cartItems,
    clearCart: () => {
      cartItems = [];
      saveCartToStorage();
      renderCartItems();
      updateCartSummary();
      updateHeaderCartCount();
    },
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    shoppingCartControllerModule.initialize
  );
} else {
  shoppingCartControllerModule.initialize();
}

export default shoppingCartControllerModule;
