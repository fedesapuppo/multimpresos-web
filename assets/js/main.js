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

  // Visor de fotos. Sin JavaScript el enlace abre la foto sola.
  var fotos = Array.prototype.slice.call(document.querySelectorAll('.foto'));
  if (!fotos.length || !window.HTMLDialogElement) return;

  var visor = document.createElement('dialog');
  visor.className = 'visor';
  visor.innerHTML =
    '<button class="visor__cerrar" type="button" aria-label="Cerrar">\u00d7</button>' +
    '<button class="visor__nav visor__nav--prev" type="button" aria-label="Foto anterior">\u2039</button>' +
    '<button class="visor__nav visor__nav--next" type="button" aria-label="Foto siguiente">\u203a</button>' +
    '<img alt=""><p class="visor__pie"></p>';
  document.body.appendChild(visor);

  var img = visor.querySelector('img');
  var pie = visor.querySelector('.visor__pie');
  var actual = 0;

  function mostrar(i) {
    actual = (i + fotos.length) % fotos.length;
    var foto = fotos[actual];
    img.src = foto.getAttribute('href');
    img.alt = foto.querySelector('img').alt;
    pie.textContent = foto.querySelector('.foto__pie').textContent;
  }

  fotos.forEach(function (foto, i) {
    foto.addEventListener('click', function (e) {
      e.preventDefault();
      mostrar(i);
      visor.showModal();
    });
  });

  visor.querySelector('.visor__cerrar').addEventListener('click', function () { visor.close(); });
  visor.querySelector('.visor__nav--prev').addEventListener('click', function () { mostrar(actual - 1); });
  visor.querySelector('.visor__nav--next').addEventListener('click', function () { mostrar(actual + 1); });

  visor.addEventListener('click', function (e) {
    if (e.target === visor) visor.close();
  });

  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });
})();
