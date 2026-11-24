/* ==========================================================================
   Paramparik Collection - Interactive Logic
   ========================================================================== */

const WHATSAPP_NUMBER = "919876543210"; // Replace with Neha Borole's official WhatsApp number

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initGalleryFilter();
  initPasswordToggles();
  initAuthForms();
  applyHashFilter();
});

// 1. Mobile Navigation Toggle
function initMobileNav() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// 2. Gallery Category Filtering
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const categorySections = document.querySelectorAll(".category-section");
  if (!filterBtns.length || !categorySections.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      categorySections.forEach((section) => {
        const cat = section.getAttribute("data-category");
        if (target === "all" || cat === target) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
}

// Automatically activate category filter if navigated via URL hash (e.g., gallery.html#bangles)
function applyHashFilter() {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (!hash) return;
  const targetBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
  if (targetBtn) {
    targetBtn.click();
  }
}

// 3. Password Visibility Toggle
function initPasswordToggles() {
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.textContent = isPassword ? "🙈" : "👁";
    });
  });
}

// 4. WhatsApp Login & Sign Up Handlers
function initAuthForms() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const mobile = document.getElementById("loginMobile").value.trim();
      if (!mobile) {
        showToast("Please enter your mobile number.");
        return;
      }
      const message = encodeURIComponent(
        `Hello Paramparik Collection! I would like to sign in to my account.\nMobile Number: ${mobile}`
      );
      showToast("Redirecting to WhatsApp for verification...");
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      }, 700);
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const address = document.getElementById("signupAddress").value.trim();
      const mobile = document.getElementById("signupMobile").value.trim();
      const pass = document.getElementById("signupPassword").value;
      const confirmPass = document.getElementById("signupConfirmPassword").value;

      if (pass.length < 6) {
        showToast("Password must be at least 6 characters.");
        return;
      }
      if (pass !== confirmPass) {
        showToast("Passwords do not match.");
        return;
      }

      const message = encodeURIComponent(
        `Hello Paramparik Collection! I'd like to register a new account:\n• Name: ${name}\n• Mobile: ${mobile}\n• Address: ${address}`
      );
      showToast("Opening WhatsApp to complete registration...");
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      }, 700);
    });
  }
}

// 5. Product Enquiry via WhatsApp
function enquireProduct(productName, price) {
  const message = encodeURIComponent(
    `Namaste Neha! I am interested in "${productName}" (${price}) from Paramparik Collection. Could you share availability details?`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

// 6. Toast Helper
function showToast(text) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}
