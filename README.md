# Multimpresos — sitio institucional

Rediseño del sitio de [Multimpresos](https://multimpresos.com.ar), imprenta gráfica
en Córdoba capital. HTML, CSS y un archivo JS. Sin build, sin dependencias.

**Vista previa:** https://fedesapuppo.github.io/multimpresos-web/

## Qué cambió respecto del sitio anterior

- Diseño responsive real. El anterior se rompía en celular, donde está el 80% del tráfico.
- Logo nuevo (el de Instagram) en el header, el hero, el favicon y la imagen de compartir.
- Call to action a WhatsApp: botón fijo, botón en el header y dos botones en la página.
- El hero ya no tapa el contenido.
- Open Graph y Twitter Card completos, con imagen 1200×630 propia. El sitio anterior no
  tenía ninguna etiqueta, así que al compartirlo por WhatsApp no aparecía vista previa.
- Datos estructurados JSON-LD (`PrintingService`) para Google.
- Las páginas "Nosotros" y "Contacto" del sitio anterior estaban con texto de relleno
  en inglés (Lorem ipsum, "1569 2nd Ave, New York"). Se descartaron. Todo el contenido
  real vive en una sola página.
- El formulario de contacto se reemplazó por WhatsApp, teléfono y mail. Un sitio estático
  no procesa formularios, y el canal que el equipo ya usa es WhatsApp.

## Contenido

Todos los textos y las fotos salen del sitio original. Solo se corrigieron tildes y
erratas evidentes. No se inventó ningún dato.

## Estructura

```
index.html            página única
assets/css/style.css  estilos
assets/js/main.js     cierre del menú móvil y año del footer (el sitio anda sin JS)
assets/img/           logo, favicons, imagen OG y fotos de cada servicio
```

## Mudanza al dominio propio

Cuando `multimpresos.com.ar` apunte acá, reemplazar `https://fedesapuppo.github.io/multimpresos-web/`
por `https://multimpresos.com.ar/` en:

- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` y el bloque JSON-LD
- `robots.txt` y `sitemap.xml`

Después agregar un archivo `CNAME` con `multimpresos.com.ar` y configurar el DNS.

## Desarrollo

```
python3 -m http.server 8899
```
