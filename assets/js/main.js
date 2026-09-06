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

  // Carrusel de fotos. Sin JavaScript se pasa con el dedo o la barra.
  var ESPERA = 4500;
  var lento = window.matchMedia('(prefers-reduced-motion: reduce)');

  function prepararCarruselesDeServicios() {
    Array.prototype.forEach.call(document.querySelectorAll('.service'), function (servicio) {
      var media = servicio.querySelector('.service__media');
      var catalogo = servicio.querySelector('.catalogo');
      if (!media || !catalogo) return;

      var tira = catalogo.querySelector('.catalogo__strip');
      var portada = media.querySelector('picture');
      if (!tira) return;

      if (portada) {
        var foto = document.createElement('li');
        foto.appendChild(portada);
        tira.insertBefore(foto, tira.firstChild);
      }
      media.appendChild(catalogo);
    });
  }

  prepararCarruselesDeServicios();

  Array.prototype.forEach.call(document.querySelectorAll('.catalogo'), function (cat) {
    var tira = cat.querySelector('.catalogo__strip');
    var fotos = Array.prototype.slice.call(tira.children);
    if (fotos.length < 2) return;

    cat.classList.add('catalogo--js');

    var actual = 0;
    var reloj = null;
    var quieto = false;
    var visible = false;
    var cargado = false;
    var sync = null;

    var ctrl = document.createElement('div');
    ctrl.className = 'catalogo__ctrl';

    var lista = document.createElement('ul');
    lista.className = 'catalogo__puntos';

    var puntos = fotos.map(function (_, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'catalogo__punto';
      b.setAttribute('aria-label', 'Foto ' + (i + 1) + ' de ' + fotos.length);
      b.addEventListener('click', function () { ir(i); reiniciar(); });
      li.appendChild(b);
      lista.appendChild(li);
      return b;
    });

    var pausa = document.createElement('button');
    pausa.type = 'button';
    pausa.className = 'catalogo__pausa';

    ctrl.appendChild(lista);
    ctrl.appendChild(pausa);
    cat.appendChild(ctrl);

    function marcar() {
      puntos.forEach(function (b, i) {
        if (i === actual) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }

    function ir(i, seco) {
      actual = (i + fotos.length) % fotos.length;
      tira.scrollTo({
        left: fotos[actual].offsetLeft - fotos[0].offsetLeft,
        behavior: seco ? 'auto' : 'smooth'
      });
      marcar();
    }

    // Las fotos siguientes quedan fuera de pantalla, hay que pedirlas antes.
    function cargar() {
      if (cargado) return;
      cargado = true;
      Array.prototype.forEach.call(tira.querySelectorAll('img[loading="lazy"]'), function (img) {
        img.loading = 'eager';
      });
    }

    function pintar() {
      pausa.hidden = lento.matches;
      pausa.textContent = quieto ? 'Reproducir' : 'Pausar';
      pausa.setAttribute('aria-label', (quieto ? 'Reproducir' : 'Pausar') + ' las fotos');
    }

    function arrancar() {
      if (reloj || quieto || !visible || lento.matches) return;
      reloj = setInterval(function () { ir(actual + 1); }, ESPERA);
    }

    function parar() {
      clearInterval(reloj);
      reloj = null;
    }

    function reiniciar() {
      if (!reloj) return;
      parar();
      arrancar();
    }

    pausa.addEventListener('click', function () {
      quieto = !quieto;
      if (quieto) parar(); else arrancar();
      pintar();
    });

    // El clic o el toque pasa a la siguiente. Arrastrar sigue siendo arrastrar.
    var desde = null;
    tira.addEventListener('pointerdown', function (e) { desde = e.clientX; });
    tira.addEventListener('pointercancel', function () { desde = null; });
    tira.addEventListener('pointerup', function (e) {
      if (desde !== null && Math.abs(e.clientX - desde) < 10) {
        ir(actual + 1);
        reiniciar();
      }
      desde = null;
    });

    tira.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(actual - 1); reiniciar(); }
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ir(actual + 1);
        reiniciar();
      }
    });

    // Al pasar con el dedo o la barra, seguir el punto que corresponde.
    tira.addEventListener('scroll', function () {
      clearTimeout(sync);
      sync = setTimeout(function () {
        var paso = fotos[1].offsetLeft - fotos[0].offsetLeft;
        if (paso > 0) {
          actual = Math.min(fotos.length - 1, Math.round(tira.scrollLeft / paso));
          marcar();
        }
      }, 120);
    });

    cat.addEventListener('mouseenter', parar);
    cat.addEventListener('mouseleave', arrancar);
    cat.addEventListener('focusin', parar);
    cat.addEventListener('focusout', arrancar);

    if (lento.addEventListener) {
      lento.addEventListener('change', function () {
        pintar();
        if (lento.matches) parar(); else arrancar();
      });
    }

    marcar();
    pintar();

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entradas) {
        visible = entradas[0].isIntersecting;
        if (visible) { cargar(); arrancar(); } else parar();
      }, { threshold: .25 }).observe(tira);
    } else {
      visible = true;
      cargar();
      arrancar();
    }
  });
})();
