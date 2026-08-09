import { FaCalendarCheck, FaEuroSign } from 'react-icons/fa'
import heroImg from '../assets/gallery/squad-cesped.jpeg'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center min-h-[92vh] pt-16 overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Perros jugando en el jardín de Pet Hotel Benitachell"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 via-navy/80 to-navy-dark/70" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
        <span className="inline-block px-4 py-1.5 rounded-full bg-teal/20 text-teal font-bold text-sm tracking-wide border border-teal/40 mb-5">
          🐾 Guardería canina sin jaulas
        </span>
        <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-cream leading-tight max-w-3xl">
          Bienvenidos a Pet Hotel Benitachell
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-cream/90 max-w-2xl">
          El mejor lugar para el descanso y bienestar de tu mascota. Tu amigo
          peludo se sentirá como en casa, en plena naturaleza y sin jaulas.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange hover:bg-orange-dark text-navy-dark font-bold text-base transition-colors shadow-lg shadow-orange/20"
          >
            <FaCalendarCheck /> Reserva ahora
          </a>
          <a
            href="#tarifas"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream font-bold text-base border border-cream/30 transition-colors"
          >
            <FaEuroSign /> Ver tarifas
          </a>
        </div>
      </div>
    </section>
  )
}
