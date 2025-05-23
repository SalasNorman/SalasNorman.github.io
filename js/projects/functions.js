function renderProjects(list) {
  document.getElementById('projectList').innerHTML = list.map(project => `
    <div class="col-md-4 project">
      <div class="card bg-secondary text-light border border-secondary">
        <img src="${project.image}" class="card-img-top" alt="Screenshot of ${project.title} project" />
        <div class="card-body">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <a href="${project.link}" class="btn btn-outline-info bg-dark" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProjects() {
  const q = document.getElementById('searchBar').value.trim().toLowerCase();
  renderProjects(projects.filter(p =>
    p.title.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
  ));
}

window.addEventListener('DOMContentLoaded', () => {
  renderProjects(projects);
  document.getElementById('searchBar').addEventListener('input', filterProjects);
});
