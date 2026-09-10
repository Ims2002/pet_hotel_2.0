# Pet Hotel Benitachell — Web

React + Vite + Tailwind CSS v4. La página principal es una Single Page
Application con navegación por anclas: Inicio, Servicios, Nosotros, Tarifas,
Galería (muestra) y Contacto. La **Galería completa** (todas las fotos) vive
en su propia página, `/galeria/`, con el mismo estilo y paleta — se separó de
la home porque el volumen de fotos era demasiado para cargarlo todo en una
sola página.

## Galería

- `src/components/Gallery.jsx` — sección de la home, muestra solo 6 fotos
  curadas y un botón "Ver todas las fotos" hacia `/galeria/`.
- `src/pages/GalleryFull.jsx` — página completa, carga **automáticamente**
  todas las imágenes que haya en `src/assets/gallery/` (usando
  `import.meta.glob`), con lightbox y navegación anterior/siguiente.
- Para añadir o quitar fotos de la galería completa, basta con añadir o
  borrar archivos en `src/assets/gallery/` — no hace falta tocar código.
- Es una segunda página de Vite (`galeria/index.html` + `galeria/main.jsx`),
  no un router de JavaScript, así que funciona igual en `npm run dev` que en
  producción sin configuración extra en Vercel.

## Paleta de marca (extraída del logo)

| Color | Hex | Uso |
|---|---|---|
| Navy | `#0b2c54` | Fondo principal, header, footer |
| Teal | `#55c5b7` | Acentos, iconos, hover |
| Orange | `#fca719` | Llamadas a la acción (CTA) |
| Cream | `#fbf3e3` | Fondo claro de secciones |

Definidos en `src/index.css` dentro de `@theme` (Tailwind v4), así que están
disponibles como clases `bg-navy`, `text-teal`, `bg-orange`, etc.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview   # para previsualizar el build localmente
```

## Contenido editable

Casi todo el contenido (teléfono, email, redes sociales, horario, enlace de
Google reseñas) está centralizado en `src/data/site.js`. Los precios están en
`src/components/Rates.jsx`.

## Formulario de contacto/reservas (Formspree)

El formulario único de Contacto (fusiona Contacto + Reservas de la web
anterior) envía los datos directamente por email mediante
[Formspree](https://formspree.io) — sin backend propio y sin depender del
cliente de correo del visitante.

**Configuración (una sola vez):**

1. Crea una cuenta gratuita en [formspree.io](https://formspree.io) (sin
   tarjeta) y un formulario nuevo.
2. Copia el endpoint que te dan, con forma `https://formspree.io/f/XXXXXXXX`.
3. Pégalo en `src/data/site.js`, en la constante `FORMSPREE_ENDPOINT`
   (sustituyendo el placeholder `XXXXXXXX`).
4. En el panel del formulario en Formspree, confirma/edita el email de
   destino en *Settings* (por defecto `guarderiacaninabenitachell@gmail.com`
   si creaste la cuenta con ese correo, o cámbialo ahí).
5. Formspree te pedirá confirmar el primer envío haciendo clic en un enlace
   que llega a ese email — es un paso único de verificación anti-spam.

El botón muestra "Enviando...", y al terminar aparece un aviso de éxito o de
error (con el email de contacto como alternativa) directamente en la página,
sin recargarla.

## Reseñas de Google (Places API)

La sección de Reseñas muestra hasta 6 reseñas reales de vuestra ficha de
Google Business, obtenidas mediante una función serverless de Vercel
(`api/reviews.js`) que llama a Google Places API. La API key nunca se expone
en el navegador, solo vive en el servidor.

**Variables de entorno necesarias:**

- `GOOGLE_PLACES_API_KEY` — API key de Google Cloud con **Places API (New)** habilitada.
- `GOOGLE_PLACE_ID` — el Place ID de la ficha de Pet Hotel Benitachell.

Ya están en `.env.local` (que **no se sube a git**, está en `.gitignore`) para
que funcione en local con `vercel dev`. Para producción, añádelas también en
**Vercel → Project Settings → Environment Variables**.

**Importante sobre la API key:**

- En Google Cloud Console, ve a *APIs & Services → Credentials*, edita la key
  y en *API restrictions* limita su uso solo a **Places API (New)**. Como la
  llamada se hace desde el servidor (no desde el navegador), no se puede
  restringir por dominio (HTTP referrer); restringirla por API es lo que la
  protege.
- Google da $200/mes de crédito gratuito en Places API, que para un negocio
  local como este cubre de sobra el tráfico esperado. La función cachea la
  respuesta 6h para minimizar las llamadas.
- Google solo permite mostrar hasta 5 reseñas por sitio (las que su algoritmo
  elige, no se pueden seleccionar manualmente) y exige mantener la atribución
  a Google, que ya está incluida en el diseño.
- Si la API falla o las variables no están configuradas, la sección cae
  automáticamente al diseño anterior (estrellas + botón a Google), así la
  web nunca se rompe.

**Desarrollo local con la función serverless:**

`npm run dev` (Vite) no ejecuta `/api`. Para probar las reseñas en local
necesitas la [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel dev
```

## Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub (o GitLab/Bitbucket).
2. En [vercel.com](https://vercel.com), pulsa **New Project** e importa el
   repositorio. Vercel detecta Vite automáticamente
   (Build Command: `npm run build`, Output Directory: `dist`).
3. Despliega. Obtendrás una URL tipo `pethotel-benitachell.vercel.app`.

### Dominio personalizado

1. En el proyecto de Vercel, ve a **Settings → Domains** y añade tu dominio
   (p. ej. `pethotelbenitachell.com`).
2. Vercel te dará los registros DNS a configurar (normalmente un registro
   `A` apuntando a `76.76.21.21` o un `CNAME` a `cname.vercel-dns.com`,
   según el subdominio).
3. Añade esos registros en el panel de tu proveedor de dominio. La
   propagación puede tardar hasta 24-48h, aunque suele ser mucho más rápida.

## Imágenes

Las fotos de la galería y el logo están en `src/assets/` (copiadas y
optimizadas para web desde la carpeta `res/` original).
