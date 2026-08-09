import { FaInstagram, FaFacebook, FaTiktok, FaClock } from 'react-icons/fa'
import photo from '../assets/gallery/sir-mimi.jpeg'
import { CONTACT, SCHEDULE } from '../data/site'

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <span className="text-teal-dark font-bold tracking-wide uppercase text-sm">
            Conócenos
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-navy mt-2 mb-5">
            Soy Rocío, fundadora de Pet Hotel
          </h2>
          <p className="text-navy-dark/80 leading-relaxed mb-4">
            Bienvenidos a Pet Hotel Benitachell. Aquí puedes hacer una
            reserva para tu perro, gato o animal exótico, consultar nuestras
            tarifas o enviarnos un mensaje para resolver cualquier duda.
          </p>
          <p className="text-navy-dark/80 leading-relaxed mb-8">
            Nuestras instalaciones están en plena naturaleza, sin jaulas,
            para que tu mascota disfrute de un ambiente tranquilo, seguro y
            familiar.
          </p>

          <div className="flex items-center gap-3 mb-6">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full bg-navy/5 hover:bg-teal hover:text-white flex items-center justify-center text-navy text-lg transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 rounded-full bg-navy/5 hover:bg-teal hover:text-white flex items-center justify-center text-navy text-lg transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href={CONTACT.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-11 h-11 rounded-full bg-navy/5 hover:bg-teal hover:text-white flex items-center justify-center text-navy text-lg transition-colors"
            >
              <FaTiktok />
            </a>
          </div>

          <div className="bg-cream rounded-2xl p-6 border border-navy/5">
            <h3 className="font-display font-semibold text-navy flex items-center gap-2 mb-4">
              <FaClock className="text-orange" /> Horario de recogidas y entregas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
              {SCHEDULE.map(({ day, hours }) => (
                <div key={day} className="flex justify-between sm:block">
                  <span className="font-semibold text-navy-dark">{day}</span>
                  <span className="text-navy-dark/70 sm:block">{hours}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-navy-dark/50 mt-4">
              Posibilidad de ampliación bajo disponibilidad y con un suplemento.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <img
            src={photo}
            alt="Perro alojado en Pet Hotel Benitachell"
            className="rounded-3xl shadow-xl w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
