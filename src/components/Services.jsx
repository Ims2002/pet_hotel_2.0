import { FaCarSide, FaDog, FaStethoscope, FaCommentDots, FaHotel, FaHouseUser } from 'react-icons/fa'

const SERVICES = [
  {
    icon: FaCarSide,
    title: 'Recogida y entrega a domicilio',
    text: 'Facilitamos la recogida y vuelta de tu mascota en tu propio hogar, con total seguridad y puntualidad.',
  },
  {
    icon: FaDog,
    title: 'Servicio de paseo a domicilio',
    text: '¿No tienes tiempo para sacar a tu peludo? Nosotros lo hacemos por ti, adaptándonos a las necesidades de ambos.',
  },
  {
    icon: FaStethoscope,
    title: 'Acompañamiento a veterinario',
    text: 'Si tu mascota necesita una visita veterinaria, nosotros la llevamos y te informamos de todo lo necesario.',
  },
  {
    icon: FaCommentDots,
    title: 'Atención personalizada',
    text: 'Ofrecemos asistencia directa para resolver tus dudas y atender cualquier necesidad especial que tenga tu peludo.',
  },
  {
    icon: FaHotel,
    title: 'Hospedaje canino',
    text: 'Alojamiento confortable, seguro y profesional. Hospedaje diurno y nocturno sin jaulas, en plena naturaleza.',
  },
  {
    icon: FaHouseUser,
    title: 'Cuidado a domicilio',
    text: 'Servicio de visita a domicilio para darle a tu mascota los cuidados que necesite en su propio entorno.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal-dark font-bold tracking-wide uppercase text-sm">
            Qué ofrecemos
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-navy mt-2">
            Nuestros servicios
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 shadow-sm border border-navy/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-teal/15 flex items-center justify-center text-teal-dark text-2xl mb-5">
                <Icon />
              </div>
              <h3 className="font-display font-semibold text-lg text-navy mb-2">
                {title}
              </h3>
              <p className="text-navy-dark/70 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
