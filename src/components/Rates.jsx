const STAY_RATES = {
  headers: ['Estancia / Mascota', 'Día\nEntre semana', 'Día + Noche\nEntre semana', 'Día\nFin de semana', 'Día + Noche\nFin de semana', 'Servicio Tarde + Noche'],
  rows: [
    ['1 Mascota', '20€', '25€', '25€', '30€', '20€'],
    ['2 Mascotas', '35€', '40€', '40€', '45€', '35€'],
    ['3 Mascotas', '45€', '50€', '50€', '55€', '40€'],
  ],
}

const OTHER_RATES = {
  headers: ['Servicio', 'Entre semana', 'Fin de semana o festivo'],
  rows: [
    ['Paseo 15 minutos', '12€', '15€'],
    ['Cuidado a domicilio 1 gato', '15€ (1 visita) / 20€ (2 visitas)', '17€ (1 visita) / 22€ (2 visitas)'],
    ['Cuidado a domicilio 2 gatos', '20€ (1 visita) / 25€ (2 visitas)', '22€ (1 visita) / 27€ (2 visitas)'],
    ['Cuidado larga estancia (+30 días)*', '18€', '20€'],
    ['Cuidado a domicilio perro', 'Consultar', 'Consultar'],
  ],
}

const GROOMING_RATES = {
  headers: ['Peluquería', 'Pelo corto', 'Pelo largo'],
  rows: [
    ['Perro grande', '35€', '40€'],
    ['Perro pequeño', '25€', '30€'],
  ],
}

function RateTable({ title, data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-navy/5 overflow-hidden">
      <h3 className="font-display font-semibold text-navy px-6 pt-5 pb-3 text-lg">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-cream">
              {data.headers.map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold whitespace-pre-line">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-cream/50' : 'bg-white'}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 whitespace-nowrap ${
                      j === 0 ? 'font-semibold text-navy' : 'text-navy-dark/80'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Rates() {
  return (
    <section id="tarifas" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal-dark font-bold tracking-wide uppercase text-sm">
            Precios claros
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-navy mt-2">
            Tarifas
          </h2>
        </div>

        <div className="space-y-8">
          <RateTable title="Hospedaje" data={STAY_RATES} />
          <div className="grid md:grid-cols-2 gap-8">
            <RateTable title="Paseos y cuidado a domicilio" data={OTHER_RATES} />
            <RateTable title="Peluquería" data={GROOMING_RATES} />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-navy/5 p-6 text-sm text-navy-dark/75 leading-relaxed space-y-2">
          <p>* Si la mascota es recogida antes de las 12h se cobra una tarifa fija de 10€; después de esa hora se cobra el día completo.</p>
          <p>* El precio incluye la comida, el baño y la estancia. Se recomienda traer juguetes o cama para familiarizar el ambiente del animal.</p>
          <p>* Ampliaciones de estancia sujetas a disponibilidad. Temporada alta con suplemento de 2€/animal (verano, 15 diciembre–7 enero, Semana Santa y temporada de comuniones).</p>
          <p>* Recogida a domicilio gratuita en un radio de 5 km. Ampliación hasta 20 km con suplemento: 10 km 12€ · 15 km 18€ · 20 km 23€.</p>
        </div>
      </div>
    </section>
  )
}
