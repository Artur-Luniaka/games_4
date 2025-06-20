// Contact Form Validator - GameVault Australia
const feedbackFormGuardian = (() => {
  "use strict";
  let form, emailInput, emailError;

  function initializeGuardian() {
    form = document.getElementById("feedbackForm");
    if (!form) return;
    emailInput = form.querySelector("#userEmail");
    emailError = form.querySelector("#emailError");
    form.addEventListener("submit", handleFormSubmission);
    emailInput.addEventListener("input", validateEmailField);
  }

  function validateEmailField() {
    const value = emailInput.value.trim();
    if (!isValidEmailPattern(value)) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.classList.add("show");
      emailInput.setAttribute("aria-invalid", "true");
      return false;
    } else {
      emailError.textContent = "";
      emailError.classList.remove("show");
      emailInput.removeAttribute("aria-invalid");
      return true;
    }
  }

  function isValidEmailPattern(email) {
    // Custom email validation: must be in the form name@domain.tld, no consecutive dots, no spaces
    return (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
      !/\.\./.test(email) &&
      !/\s/.test(email)
    );
  }

  function handleFormSubmission(e) {
    e.preventDefault();
    const isEmailValid = validateEmailField();
    if (!isEmailValid) {
      emailInput.focus();
      return;
    }
    // Simulate successful submission UX
    form.classList.add("form-loading");
    setTimeout(() => {
      form.classList.remove("form-loading");
      form.reset();
      emailError.textContent = "";
      emailError.classList.remove("show");
      showFormSuccessMessage();
    }, 1200);
  }

  function showFormSuccessMessage() {
    const successMsg = document.createElement("div");
    successMsg.className = "form-success";
    successMsg.textContent =
      "Thank you for your message! We will get back to you soon.";
    form.parentNode.insertBefore(successMsg, form);
    setTimeout(() => {
      successMsg.remove();
    }, 4000);
  }

  // Public API
  return {
    initialize: initializeGuardian,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    feedbackFormGuardian.initialize
  );
} else {
  feedbackFormGuardian.initialize();
}

export default feedbackFormGuardian;
