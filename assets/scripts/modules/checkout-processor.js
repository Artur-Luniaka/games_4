// Checkout Processor Module - GameVault Australia
const checkoutProcessorModule = (() => {
  "use strict";
  let cartItems = [];
  const SHIPPING_THRESHOLD = 100;
  const SHIPPING_COST = 9.99;

  function initializeCheckoutProcessor() {
    loadCartData();
    setupEventListeners();
    renderOrderSummary();
  }

  function loadCartData() {
    try {
      const storedCart = sessionStorage.getItem("checkoutCart");
      if (!storedCart) {
        redirectToCart();
        return;
      }

      cartItems = JSON.parse(storedCart);

      if (cartItems.length === 0) {
        redirectToCart();
        return;
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      redirectToCart();
    }
  }

  function redirectToCart() {
    window.location.href = "shopping-cart.html";
  }

  function setupEventListeners() {
    const checkoutForm = document.getElementById("checkoutForm");
    checkoutForm.addEventListener("submit", handleFormSubmit);

    // Real-time validation
    const emailInput = document.getElementById("customerEmail");

    emailInput.addEventListener("blur", () => validateEmail(emailInput.value));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = {
      name: formData.get("customerName"),
      email: formData.get("customerEmail"),
      phone: formData.get("customerPhone"),
    };

    if (validateForm(customerData)) {
      processOrder(customerData);
    }
  }

  function validateForm(customerData) {
    let isValid = true;

    // Validate email
    if (!validateEmail(customerData.email)) {
      isValid = false;
    }

    return isValid;
  }

  function validateEmail(email) {
    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("customerEmail");

    if (!email || email.trim().length === 0) {
      showFieldError(emailInput, emailError, "Please enter your email address");
      return false;
    }

    // Custom email validation (reusing from contact form validator)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showFieldError(
        emailInput,
        emailError,
        "Please enter a valid email address"
      );
      return false;
    }

    // Check for common disposable email domains
    const disposableDomains = [
      "tempmail.org",
      "guerrillamail.com",
      "mailinator.com",
      "10minutemail.com",
      "throwaway.email",
      "temp-mail.org",
      "fakeinbox.com",
      "sharklasers.com",
    ];

    const domain = email.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      showFieldError(
        emailInput,
        emailError,
        "Please use a valid email address (no temporary emails)"
      );
      return false;
    }

    clearFieldError(emailInput, emailError);
    return true;
  }

  function showFieldError(input, errorElement, message) {
    input.classList.add("error");
    input.classList.remove("valid");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function clearFieldError(input, errorElement) {
    input.classList.remove("error");
    input.classList.add("valid");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  function renderOrderSummary() {
    const orderItemsContainer = document.getElementById("orderItems");

    orderItemsContainer.innerHTML = cartItems
      .map(
        (item) => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.cover}" alt="${item.title}" loading="lazy">
                </div>
                <div class="order-item-details">
                    <div class="order-item-title">${item.title}</div>
                    <div class="order-item-platform">${item.platform.join(
                      ", "
                    )}</div>
                    <div class="order-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="order-item-price">$${(
                  item.price * item.quantity
                ).toFixed(2)}</div>
            </div>
        `
      )
      .join("");

    updateOrderTotals();
  }

  function updateOrderTotals() {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    document.getElementById("orderSubtotal").textContent = `$${subtotal.toFixed(
      2
    )}`;
    document.getElementById("orderShipping").textContent =
      shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
    document.getElementById("orderTotal").textContent = `$${total.toFixed(2)}`;
  }

  async function processOrder(customerData) {
    showProcessingModal();

    try {
      // Simulate order processing delay
      await simulateOrderProcessing();

      // Generate order ID
      const orderId = generateOrderId();

      // Create order object
      const order = {
        id: orderId,
        customer: customerData,
        items: cartItems,
        subtotal: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        shipping:
          cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) >= SHIPPING_THRESHOLD
            ? 0
            : SHIPPING_COST,
        total:
          cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
          (cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) >= SHIPPING_THRESHOLD
            ? 0
            : SHIPPING_COST),
        date: new Date().toISOString(),
        status: "confirmed",
      };

      // Store order in localStorage for demo purposes
      storeOrder(order);

      // Clear cart
      clearCart();

      // Show success modal
      showSuccessModal(order);
    } catch (error) {
      console.error("Error processing order:", error);
      hideProcessingModal();
      showErrorNotification(
        "There was an error processing your order. Please try again."
      );
    }
  }

  function simulateOrderProcessing() {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000); // 3 second delay
    });
  }

  function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `ILC-${timestamp}-${random}`.toUpperCase();
  }

  function storeOrder(order) {
    try {
      const orders =
        JSON.parse(localStorage.getItem("interactiveLuckCoreOrders")) || [];
      orders.push(order);
      localStorage.setItem("interactiveLuckCoreOrders", JSON.stringify(orders));
    } catch (error) {
      console.error("Error storing order:", error);
    }
  }

  function clearCart() {
    try {
      localStorage.removeItem("interactiveLuckCoreCart");
      sessionStorage.removeItem("checkoutCart");

      // Update header cart count
      const headerModule = window.headerInjectionModule;
      if (headerModule && headerModule.updateCartCount) {
        headerModule.updateCartCount();
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  function showProcessingModal() {
    const modal = document.getElementById("processingModal");
    modal.style.display = "flex";
  }

  function hideProcessingModal() {
    const modal = document.getElementById("processingModal");
    modal.style.display = "none";
  }

  function showSuccessModal(order) {
    hideProcessingModal();

    const modal = document.getElementById("successModal");
    const orderId = document.getElementById("orderId");
    const orderTotalDisplay = document.getElementById("orderTotalDisplay");

    orderId.textContent = order.id;
    orderTotalDisplay.textContent = `$${order.total.toFixed(2)}`;

    modal.style.display = "flex";
  }

  function showErrorNotification(message) {
    const notification = document.createElement("div");
    notification.className =
      "checkout-notification checkout-notification-error";
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">❌</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

    // Add notification styles if not already present
    if (!document.querySelector("#checkout-notification-styles")) {
      const style = document.createElement("style");
      style.id = "checkout-notification-styles";
      style.textContent = `
                .checkout-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-lg);
                    z-index: 10001;
                    transform: translateX(100%);
                    transition: transform var(--transition-normal);
                    max-width: 300px;
                    color: var(--neutral-100);
                }
                .checkout-notification-error {
                    background: var(--error-color);
                }
                .checkout-notification.show {
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
    }, 5000);
  }

  // Public API
  return {
    initialize: initializeCheckoutProcessor,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    checkoutProcessorModule.initialize
  );
} else {
  checkoutProcessorModule.initialize();
}

export default checkoutProcessorModule;
