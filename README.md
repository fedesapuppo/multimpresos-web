# Multimpresos — sitio institucional

Rediseño del sitio de [Multimpresos](https://multimpresos.com.ar), imprenta gráfica
en Córdoba capital. HTML, CSS y un archivo JS. Sin build, sin dependencias.

**Vista previa:** https://fedesapuppo.github.io/multimpresos-web/

## Qué cambió respecto del sitio anterior

- Diseño responsive real. El anterior se rompía en celular, donde está el 80% del tráfico.
- Logo nuevo (el de Instagram) en el header, el hero, el favicon y la imagen de compartir.
  El nombre y la marca de la M van más grandes, y el zócalo "Imprenta · Gráfica · Sellos"
  se justifica contra el ancho del nombre.
- Catálogo de fotos en cada servicio: una tira que se desliza con el dedo, y un visor a
  pantalla completa al tocar una foto. Sin JavaScript el enlace abre la foto sola.
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

Todos los textos y las fotos de portada salen del sitio original. Solo se corrigieron
tildes y erratas evidentes. No se inventó ningún dato.

Las 33 fotos del catálogo salen de dos lugares. Veintiuna son las galerías del
WordPress anterior, recuperadas del respaldo que quedó en la cuenta de WNPower
(`/respaldo-wp-2026-09-05/wp-content/uploads/2020/07`). Wayback había archivado el HTML
del sitio viejo pero ninguna de esas imágenes. Las otras doce salen de la página
pública de Facebook, porque Instagram no se puede leer sin cuenta; a cada una se le
recortó el marco de la placa promocional, que llevaba el teléfono y la dirección
viejos (351 4290749, Sucre 289).

Cuidado con el origen: varias fotos del sitio anterior son de banco o maquetas, no
trabajos propios, y las dos de ploteos son fotos de catálogo de la máquina. Conviene
reemplazarlas cuando Javier mande fotos de trabajos reales.

## Estructura

```
index.html            página única
assets/css/style.css  estilos
assets/js/main.js     cierre del menú móvil y año del footer (el sitio anda sin JS)
assets/img/           logo, favicons, imagen OG y fotos de cada servicio
assets/img/catalogo/  fotos de trabajos, una tira por servicio
```

## Despliegue

El sitio va al hosting que Multimpresos ya tiene en WNPower, reemplazando el
WordPress que ocupaba `public_html`. No se toca el DNS.

El dominio no tiene registros MX. El mail de `info@multimpresos.com.ar` entra por
MX implícito al mismo IP que sirve el sitio (52.44.154.118). Mover el registro A a
otro hosting cortaría el correo, así que quedarse en WNPower lo evita.

`.htaccess` redirige con 301 las dos URLs del WordPress viejo que ya no existen:
`/nosotros/` va a la home y `/contacto/` va a `/#contacto`.

## Desarrollo

```
python3 -m http.server 8899
```
