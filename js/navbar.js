// js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("includes/navbar.html")
    .then(response => {
      if (!response.ok) throw new Error("Navbar failed to load");
      return response.text();
    })
    .then(data => {
      const navContainer = document.getElementById("navbar-container");
      if (navContainer) {
        navContainer.innerHTML = data;

        // After navbar is loaded, determine current page and set active class
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = navContainer.querySelectorAll("a.nav-link");

        navLinks.forEach(link => {
          const href = link.getAttribute("href");
          if (href === currentPage) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });
});
