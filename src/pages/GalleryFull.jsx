import { useCallback, useEffect, useState } from 'react'
import { FiX, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi'

// Importa automáticamente todas las fotos de src/assets/gallery/.
// Para añadir fotos nuevas basta con copiarlas a esa carpeta.
const imageModules = import.meta.glob('../assets/gallery/*.{jpeg,jpg,png}', { eager: true })

const PHOTOS = Object.keys(imageModules)
  .sort()
  .map((path) => ({
    src: imageModules[path].default,
    alt: 'Mascota alojada en Pet Hotel Benitachell',
  }))

export default function GalleryFull() {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    []
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, prev, next])

  return (
    <section className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-teal-dark font-semibold text-sm mb-6 hover:text-navy transition-colors"
        >
          <FiArrowLeft /> Volver al inicio
        </a>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-dark font-bold tracking-wide uppercase text-sm">
            Momentos peludos
          </span>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-navy mt-2">
            Galería completa
          </h1>
          <p className="text-navy-dark/70 mt-3">
            {PHOTOS.length} fotos de nuestros huéspedes disfrutando en Pet Hotel Benitachell.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => setActive(i)}
              className="group relative rounded-xl overflow-hidden aspect-square"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] bg-navy-dark/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            className="absolute top-5 right-5 text-cream text-3xl"
            onClick={close}
            aria-label="Cerrar"
          >
            <FiX />
          </button>

          <button
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 text-cream text-3xl sm:text-4xl p-2"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Foto anterior"
          >
            <FiChevronLeft />
          </button>

          <img
            src={PHOTOS[active].src}
            alt={PHOTOS[active].alt}
            className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 text-cream text-3xl sm:text-4xl p-2"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Foto siguiente"
          >
            <FiChevronRight />
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cream/70 text-sm">
            {active + 1} / {PHOTOS.length}
          </span>
        </div>
      )}
    </section>
  )
}
