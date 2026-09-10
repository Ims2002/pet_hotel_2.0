import { FaImages } from 'react-icons/fa'
import squadCesped from '../assets/gallery/squad-cesped.jpeg'
import billSleep from '../assets/gallery/bill-sleep.jpeg'
import billTopare from '../assets/gallery/bill-topare.jpeg'
import sirMimi from '../assets/gallery/sir-mimi.jpeg'
import sky from '../assets/gallery/sky.jpeg'
import petHotel from '../assets/gallery/pethotel.jpeg'

// Solo una muestra aquí — la galería completa (todas las fotos) vive en /galeria/
const PREVIEW_PHOTOS = [
  { src: squadCesped, alt: 'Grupo de perros jugando en el jardín' },
  { src: sirMimi, alt: 'Perro relajado dentro de las instalaciones' },
  { src: sky, alt: 'Perro de paseo con vistas al Peñón de Ifach' },
  { src: billTopare, alt: 'Cachorro descansando con sus juguetes' },
  { src: billSleep, alt: 'Perro durmiendo tranquilo' },
  { src: petHotel, alt: 'Cartel de Pet Hotel Benitachell' },
]

export default function Gallery() {
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
          {PREVIEW_PHOTOS.map((photo, i) => (
            <a
              key={photo.src}
              href="/galeria/"
              className={`group relative rounded-2xl overflow-hidden block ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/galeria/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy hover:bg-navy-light text-cream font-bold transition-colors shadow-lg"
          >
            <FaImages /> Ver todas las fotos
          </a>
        </div>
      </div>
    </section>
  )
}
