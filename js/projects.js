document.getElementById('searchBar').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll('.project').forEach(p => {
    p.style.display = p.querySelector('.card-title').textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});
