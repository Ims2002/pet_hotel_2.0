import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { CONTACT } from '../data/site'

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
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // TODO: sustituir este envío por Formspree (o el proveedor elegido) cuando
    // esté decidido. Por ahora se abre el cliente de correo del usuario con
    // los datos precargados, para que el formulario ya sea funcional.
    const body = [
      `Nombre: ${form.nombre}`,
      `Teléfono: ${form.telefono}`,
      `Email: ${form.email}`,
      form.mascota && `Mascota: ${form.mascota}`,
      form.fechaInicio && `Fecha inicio estancia: ${form.fechaInicio}`,
      form.fechaFin && `Fecha fin estancia: ${form.fechaFin}`,
      '',
      'Mensaje:',
      form.mensaje,
    ]
      .filter(Boolean)
      .join('\n')

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      'Contacto / Reserva – Pet Hotel Benitachell'
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setSent(true)
    setForm(initialForm)
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
          {sent && (
            <div className="mb-6 flex items-center gap-2 text-teal-dark bg-teal/10 border border-teal/30 rounded-xl px-4 py-3 text-sm font-semibold">
              <FaCheckCircle /> ¡Gracias! Hemos abierto tu app de correo para enviar tu solicitud.
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
            className="mt-6 w-full sm:w-auto px-8 py-3.5 rounded-full bg-orange hover:bg-orange-dark text-navy-dark font-bold transition-colors"
          >
            Enviar solicitud
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
