import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT } from '../data/site'

export default function WhatsAppButton() {
  const text = encodeURIComponent(
    'Hola! Me gustaría más información sobre Pet Hotel Benitachell.'
  )
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl shadow-xl hover:scale-110 transition-transform"
    >
      <FaWhatsapp />
    </a>
  )
}
