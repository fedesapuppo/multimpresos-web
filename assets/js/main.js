// Progressive enhancement. El sitio funciona sin JavaScript.
(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.querySelector('.nav');

  // Cerrar el menú móvil al elegir una sección.
  if (toggle && nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) toggle.checked = false;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggle.checked = false;
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
