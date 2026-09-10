import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import logo from '../assets/logo.jpeg'
import { CONTACT, NAV_LINKS, navHref } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-cream/80 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Pet Hotel Benitachell" className="h-10 w-10 rounded-full object-cover ring-2 ring-teal" />
            <span className="font-display font-semibold text-cream">Pet Hotel Benitachell</span>
          </div>
          <p className="text-sm leading-relaxed">
            Guardería canina sin jaulas en Benitachell. Hospedaje, paseos y
            cuidados con cariño, en plena naturaleza.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal hover:text-navy-dark flex items-center justify-center transition-colors">
              <FaInstagram />
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal hover:text-navy-dark flex items-center justify-center transition-colors">
              <FaFacebook />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal hover:text-navy-dark flex items-center justify-center transition-colors">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={navHref(link.href)} className="hover:text-teal transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:+34${CONTACT.phone}`} className="hover:text-teal transition-colors">
                📞 {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-teal transition-colors break-all">
                ✉️ {CONTACT.email}
              </a>
            </li>
            <li>📍 {CONTACT.location}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-white/10 text-xs text-cream/50 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Pet Hotel Benitachell. Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}
