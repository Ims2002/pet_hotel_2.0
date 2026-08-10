import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import squadCesped from '../assets/gallery/squad-cesped.jpeg'
import billSleep from '../assets/gallery/bill-sleep.jpeg'
import billTopare from '../assets/gallery/bill-topare.jpeg'
import sirMimi from '../assets/gallery/sir-mimi.jpeg'
import sky from '../assets/gallery/sky.jpeg'
import petHotel from '../assets/gallery/pethotel.jpeg'

const PHOTOS = [
  { src: squadCesped, alt: 'Grupo de perros jugando en el jardín', caption: 'Zona de juegos al aire libre' },
  { src: sirMimi, alt: 'Perro relajado dentro de las instalaciones', caption: 'Como en casa' },
  { src: sky, alt: 'Perro de paseo con vistas al Peñón de Ifach', caption: 'Paseos por la zona' },
  { src: billTopare, alt: 'Cachorro descansando con sus juguetes', caption: 'Momento de juego' },
  { src: billSleep, alt: 'Perro durmiendo tranquilo', caption: 'Descanso tranquilo' },
  { src: petHotel, alt: 'Cartel de Pet Hotel Benitachell', caption: 'Nuestras instalaciones' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal-dark font-bold tracking-wide uppercase text-sm">
            Momentos peludos
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-navy mt-2">
            Galería
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => setActive(i)}
              className={`group relative rounded-2xl overflow-hidden ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] bg-navy-dark/95 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 text-cream text-3xl"
            onClick={() => setActive(null)}
            aria-label="Cerrar"
          >
            <FiX />
          </button>
          <img
            src={PHOTOS[active].src}
            alt={PHOTOS[active].alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
