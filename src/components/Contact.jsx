import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { CONTACT, FORMSPREE_ENDPOINT } from '../data/site'

const initialForm = {
  nombre: '',
  telefono: '',
  email: '',
  mascota: '',
  fechaInicio: '',
  fechaFin: '',
  mensaje: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nombre: form.nombre,
          Teléfono: form.telefono,
          Email: form.email,
          Mascota: form.mascota || '—',
          'Fecha inicio estancia': form.fechaInicio || '—',
          'Fecha fin estancia': form.fechaFin || '—',
          Mensaje: form.mensaje,
          _subject: 'Contacto / Reserva – Pet Hotel Benitachell',
        }),
      })

      if (!res.ok) throw new Error('Formspree respondió con error')

      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <span className="text-teal-dark font-bold tracking-wide uppercase text-sm">
            Hablemos
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-navy mt-2 mb-5">
            Contacto y reservas
          </h2>
          <p className="text-navy-dark/80 leading-relaxed mb-8">
            Rellena el formulario para reservar una estancia o resolver
            cualquier duda. Al enviarlo no se garantiza la reserva al 100%;
            te contactaremos para confirmarla. Recuerda que tu mascota debe
            estar correctamente vacunada, desparasitada e identificada con chip.
          </p>

          <div className="space-y-4">
            <a href={`tel:+34${CONTACT.phone}`} className="flex items-center gap-3 text-navy-dark hover:text-teal-dark transition-colors">
              <span className="w-10 h-10 rounded-full bg-teal/15 flex items-center justify-center text-teal-dark">
                <FaPhoneAlt />
              </span>
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-navy-dark hover:text-teal-dark transition-colors break-all">
              <span className="w-10 h-10 rounded-full bg-teal/15 flex items-center justify-center text-teal-dark shrink-0">
                <FaEnvelope />
              </span>
              {CONTACT.email}
            </a>
            <div className="flex items-center gap-3 text-navy-dark">
              <span className="w-10 h-10 rounded-full bg-teal/15 flex items-center justify-center text-teal-dark">
                <FaMapMarkerAlt />
              </span>
              {CONTACT.location}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-navy/5 p-6 sm:p-8"
        >
          {status === 'sent' && (
            <div className="mb-6 flex items-center gap-2 text-teal-dark bg-teal/10 border border-teal/30 rounded-xl px-4 py-3 text-sm font-semibold">
              <FaCheckCircle /> ¡Gracias! Tu solicitud se ha enviado correctamente, te contactaremos en breve.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 flex items-center gap-2 text-orange-dark bg-orange/10 border border-orange/30 rounded-xl px-4 py-3 text-sm font-semibold">
              <FaExclamationCircle /> No se pudo enviar. Prueba de nuevo o escríbenos directamente a {CONTACT.email}.
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
            <Field label="Teléfono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required className="sm:col-span-2" />
            <Field label="Mascota (nombre y raza)" name="mascota" value={form.mascota} onChange={handleChange} className="sm:col-span-2" placeholder="Ej. Toby, Golden Retriever" />
            <Field label="Fecha inicio estancia" name="fechaInicio" type="date" value={form.fechaInicio} onChange={handleChange} />
            <Field label="Fecha fin estancia" name="fechaFin" type="date" value={form.fechaFin} onChange={handleChange} />
          </div>

          <div className="mt-5">
            <label htmlFor="mensaje" className="block text-sm font-semibold text-navy mb-1.5">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos qué necesitas..."
              className="w-full rounded-xl border border-navy/15 px-4 py-2.5 text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 w-full sm:w-auto px-8 py-3.5 rounded-full bg-orange hover:bg-orange-dark disabled:opacity-60 disabled:cursor-not-allowed text-navy-dark font-bold transition-colors"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-navy mb-1.5">
        {label}
        {required && <span className="text-orange-dark"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-navy/15 px-4 py-2.5 text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal"
      />
    </div>
  )
}
