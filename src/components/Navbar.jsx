import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/logo.jpeg'
import { NAV_LINKS } from '../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-navy shadow-lg' : 'bg-navy/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="Pet Hotel Benitachell"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-teal"
          />
          <span className="font-display font-semibold text-cream text-lg leading-tight hidden sm:block">
            Pet Hotel<br className="hidden" /> Benitachell
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-semibold text-cream/90 hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-2 px-4 py-2 rounded-full bg-orange text-navy-dark text-sm font-bold hover:bg-orange-dark transition-colors"
          >
            Reservar
          </a>
        </nav>

        <button
          className="lg:hidden text-cream text-2xl p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden bg-navy border-t border-white/10 px-4 pb-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-2 py-3 text-cream/90 font-semibold border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-3 mb-1 text-center px-4 py-3 rounded-full bg-orange text-navy-dark font-bold"
          >
            Reservar
          </a>
        </nav>
      )}
    </header>
  )
}
