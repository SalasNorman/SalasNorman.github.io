// js/navbar.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("includes/navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Navbar failed to load");
      }
      return response.text();
    })
    .then(data => {
      const navContainer = document.getElementById("navbar-container");
      if (navContainer) {
        navContainer.innerHTML = data;
      }
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });
});
