let projects = [];

function renderProjects(list) {
  document.getElementById('projectList').innerHTML = list.map(project => `
    <div class="col-12 col-sm-6 col-md-4 project">
      <div class="card h-100 d-flex flex-column bg-secondary text-light border border-secondary">
        <img src="${project.image}" class="card-img-top" alt="Screenshot of ${project.title} project" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text flex-grow-1">${project.description}</p>
          <a href="${project.link}" class="btn btn-outline-info mt-3" target="_blank" rel="noopener noreferrer">View on GitHub</a>
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
  fetch('js/projects/data.json')
    .then(response => response.json())
    .then(data => {
      projects = data;
      renderProjects(projects);
      document.getElementById('searchBar').addEventListener('input', filterProjects);
    })
    .catch(error => {
      console.error('Failed to load projects:', error);
      document.getElementById('projectList').innerHTML = `<p class="text-danger">Failed to load projects.</p>`;
    });
});
