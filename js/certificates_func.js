// Simple filter state
let selectedOrg = "", selectedTech = "";

// Badge style mapping (simplified)
const badgeStyles = {
  Python: "background-color: yellow; color: black;",
  Java: "background-color: orange; color: white;",
  "Machine Learning": "background-color: cyan; color: black;",
  "Google Cloud": "background-color: deepskyblue; color: white;"
};

// Render filter buttons
function renderFilters() {
  const orgs = [...new Set(certificates.map(c => c.organization).filter(Boolean))];
  const techs = [...new Set(certificates.flatMap(c => c.techStack).filter(Boolean))];

  const orgBtns = ['All', ...orgs].map(org =>
    `<button class="btn btn-outline-dark btn-sm me-2 filter-btn" data-type="org" data-value="${org === 'All' ? '' : org}">${org}</button>`
  ).join('');
  document.getElementById("organization-filters").innerHTML = `<strong>Organization:</strong><br>${orgBtns}`;

  const techBtns = ['All', ...techs].map(tech =>
    `<button class="btn btn-outline-primary btn-sm me-2 filter-btn" data-type="tech" data-value="${tech === 'All' ? '' : tech}">${tech}</button>`
  ).join('');
  document.getElementById("techstack-filters").innerHTML = `<strong>TechStack:</strong><br>${techBtns}`;
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
          ${(cert.techStack||[]).filter(Boolean).map(b=>`<span class="badge me-1" style="${badgeStyles[b]||'background-color:gray; color:white;'}">${b}</span>`).join('')}
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
    (cert.techStack||[]).filter(Boolean).map(b=>`<span class="badge me-1" style="${badgeStyles[b]||'background-color:gray; color:white;'}">${b}</span>`).join('');
  new bootstrap.Modal(document.getElementById("certificateModal")).show();
}

// Event setup
window.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  applyFilters();

  // Filter button click (event delegation)
  document.getElementById("filter-section").addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
      if (e.target.dataset.type === "org") selectedOrg = e.target.dataset.value;
      if (e.target.dataset.type === "tech") selectedTech = e.target.dataset.value;
      // Highlight
      document.querySelectorAll(`.filter-btn[data-type="${e.target.dataset.type}"]`).forEach(b=>b.classList.remove("active"));
      e.target.classList.add("active");
      applyFilters();
    }
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
