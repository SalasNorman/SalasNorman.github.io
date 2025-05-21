// Simple filter state
let selectedOrg = "", selectedTech = "";

// Render filter dropdowns
function renderFilters() {
  const orgs = [...new Set(certificates.map(c => c.organization).filter(Boolean))];
  const techs = [...new Set(certificates.flatMap(c => c.techStack).filter(Boolean))];

  // Populate organization dropdown
  const orgDropdown = document.getElementById("organizationDropdown");
  orgDropdown.innerHTML = `<option value="">All</option>` +
    orgs.map(org => `<option value="${org}">${org}</option>`).join('');

  // Populate techstack dropdown
  const techDropdown = document.getElementById("techstackDropdown");
  techDropdown.innerHTML = `<option value="">All</option>` +
    techs.map(tech => `<option value="${tech}">${tech}</option>`).join('');
}

// Render certificates
function renderCertificates(data) {
  document.getElementById("certificates-container").innerHTML = data.map(cert => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 certificate-card" style="cursor:pointer;" data-img="${cert.image}" data-title="${cert.title}" data-org="${cert.organization}" data-tech='${JSON.stringify(cert.techStack)}'>
        <img src="${cert.image}" class="card-img-top" alt="${cert.title}">
        <div class="card-body">
          <h5 class="card-title">${cert.title}</h5>
          <span class="badge me-1 bg-info text-dark">${cert.organization}</span>
          ${(cert.techStack||[]).filter(Boolean).map(b=>`<span class="badge me-1" style="background-color:gray; color:white;">${b}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Filter and render
function applyFilters() {
  renderCertificates(certificates.filter(cert =>
    (!selectedOrg || cert.organization === selectedOrg) &&
    (!selectedTech || (cert.techStack||[]).includes(selectedTech))
  ));
}

// Modal logic
function showModal(cert) {
  document.getElementById("modalCertImage").src = cert.image;
  document.getElementById("certificateModalLabel").textContent = cert.title;
  document.getElementById("modalCertBadges").innerHTML =
    `<span class="badge me-1 bg-info text-dark">${cert.organization}</span>` +
    (cert.techStack||[]).filter(Boolean).map(b=>`<span class="badge me-1" style="background-color:gray; color:white;">${b}</span>`).join('');
  new bootstrap.Modal(document.getElementById("certificateModal")).show();
}

// Event setup
window.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  applyFilters();

  // Dropdown change events
  document.getElementById("organizationDropdown").addEventListener("change", e => {
    selectedOrg = e.target.value;
    applyFilters();
  });
  document.getElementById("techstackDropdown").addEventListener("change", e => {
    selectedTech = e.target.value;
    applyFilters();
  });

  // Card click (event delegation)
  document.getElementById("certificates-container").addEventListener("click", e => {
    const card = e.target.closest(".certificate-card");
    if (card) {
      showModal({
        image: card.dataset.img,
        title: card.dataset.title,
        organization: card.dataset.org,
        techStack: JSON.parse(card.dataset.tech)
      });
    }
  });
});
