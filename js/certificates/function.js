let certificates = [];
let selectedOrg = "", selectedTech = "", selectedPathway = "";

// Render dropdown filters
function renderFilters() {
  const orgs = [...new Set(certificates.map(c => c.organization).filter(Boolean))];
  const techs = [...new Set(certificates.flatMap(c => c.techStack).filter(Boolean))];

  document.getElementById("organizationDropdown").innerHTML =
    `<option value="">All</option>` + orgs.map(o => `<option value="${o}">${o}</option>`).join('');

  document.getElementById("techstackDropdown").innerHTML =
    `<option value="">All</option>` + techs.map(t => `<option value="${t}">${t}</option>`).join('');
}

// Render certificate cards
function renderCertificates(data) {
  const container = document.getElementById("certificates-container");
  container.innerHTML = data.map(cert => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 bg-secondary text-light certificate-card" style="cursor:pointer"
        data-img="${cert.image}"
        data-title="${cert.title}"
        data-org="${cert.organization}"
        data-tech='${JSON.stringify(cert.techStack)}'
        data-pathway="${cert.pathway || ''}">
        <img src="${cert.image}" class="card-img-top" alt="${cert.title}">
        <div class="card-body">
          <h5 class="card-title">${cert.title}</h5>
          ${cert.pathway ? `<span class="badge bg-warning text-dark me-1">${cert.pathway}</span>` : ""}
          <span class="badge bg-info text-dark me-1">${cert.organization}</span>
          ${(cert.techStack || []).map(t => `<span class="badge bg-dark border border-light text-light me-1">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Filter and render
function applyFilters() {
  const filtered = certificates.filter(cert =>
    (!selectedPathway || cert.pathway === selectedPathway) &&
    (!selectedOrg || cert.organization === selectedOrg) &&
    (!selectedTech || (cert.techStack || []).includes(selectedTech))
  );
  renderCertificates(filtered);
}

// Show modal
function showModal(cert) {
  document.getElementById("modalCertImage").src = cert.image;
  document.getElementById("certificateModalLabel").textContent = cert.title;
  document.getElementById("modalCertBadges").innerHTML =
    (cert.pathway ? `<span class="badge bg-warning text-dark me-1">${cert.pathway}</span>` : '') +
    `<span class="badge bg-info text-dark me-1">${cert.organization}</span>` +
    (cert.techStack || []).map(t => `<span class="badge bg-dark border border-light text-light me-1">${t}</span>`).join('');
  new bootstrap.Modal(document.getElementById("certificateModal")).show();
}

// On page load
window.addEventListener("DOMContentLoaded", () => {
  fetch('js/certificates/data.json')
    .then(res => res.json())
    .then(data => {
      certificates = data;
      renderFilters();
      applyFilters();

      document.getElementById("pathwayDropdown").addEventListener("change", e => {
        selectedPathway = e.target.value;
        applyFilters();
      });

      document.getElementById("organizationDropdown").addEventListener("change", e => {
        selectedOrg = e.target.value;
        applyFilters();
      });

      document.getElementById("techstackDropdown").addEventListener("change", e => {
        selectedTech = e.target.value;
        applyFilters();
      });

      document.getElementById("certificates-container").addEventListener("click", e => {
        const card = e.target.closest(".certificate-card");
        if (card) {
          showModal({
            image: card.dataset.img,
            title: card.dataset.title,
            organization: card.dataset.org,
            techStack: JSON.parse(card.dataset.tech),
            pathway: card.dataset.pathway
          });
        }
      });
    });
});
