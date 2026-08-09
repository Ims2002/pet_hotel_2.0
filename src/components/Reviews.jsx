import { useEffect, useState } from 'react'
import { FaStar, FaGoogle } from 'react-icons/fa'
import { CONTACT } from '../data/site'

export default function Reviews() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ok | error

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((json) => {
        if (json.error || !json.reviews?.length) {
          setStatus('error')
        } else {
          setData(json)
          setStatus('ok')
        }
      })
      .catch(() => setStatus('error'))
  }, [])

  const mapsUrl = data?.googleMapsUri || CONTACT.googleReviews

  return (
    <section id="resenas" className="py-20 bg-navy relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <span className="text-teal font-bold tracking-wide uppercase text-sm">
          Confían en nosotros
        </span>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-cream mt-2 mb-1">
          Reseñas
        </h2>

        {status === 'ok' && (
          <p className="text-cream/50 text-xs mb-6 flex items-center justify-center gap-1.5">
            <FaGoogle /> Reseñas verificadas de Google
          </p>
        )}

        {status === 'ok' && data.rating && (
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="text-3xl font-display font-semibold text-cream">
              {data.rating.toFixed(1)}
            </span>
            <div className="flex text-orange text-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className={i < Math.round(data.rating) ? '' : 'opacity-30'} />
              ))}
            </div>
            {data.userRatingCount && (
              <span className="text-cream/60 text-sm">({data.userRatingCount} reseñas)</span>
            )}
          </div>
        )}

        {status !== 'ok' && (
          <div className="flex items-center justify-center gap-1 text-orange text-2xl mb-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className={status === 'loading' ? 'animate-pulse' : ''} />
            ))}
          </div>
        )}

        {status === 'ok' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 text-left">
            {data.reviews.slice(0, 6).map((r, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  {r.photo ? (
                    <img
                      src={r.photo}
                      alt={r.author}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-teal/30 flex items-center justify-center text-cream font-semibold shrink-0">
                      {r.author.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-cream text-sm font-semibold truncate">{r.author}</p>
                    <p className="text-cream/50 text-xs">{r.relativeTime}</p>
                  </div>
                </div>
                {r.rating != null && (
                  <div className="flex text-orange text-sm mb-2">
                    {Array.from({ length: 5 }).map((_, i2) => (
                      <FaStar key={i2} className={i2 < r.rating ? '' : 'opacity-25'} />
                    ))}
                  </div>
                )}
                <p className="text-cream/80 text-sm leading-relaxed line-clamp-5">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {status !== 'ok' && (
          <p className="text-cream/80 leading-relaxed mb-8 max-w-xl mx-auto">
            Puedes consultar nuestras reseñas reales y actualizadas en nuestro
            perfil de empresa de Google.
          </p>
        )}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-navy font-bold hover:bg-cream transition-colors shadow-lg"
        >
          <FaGoogle className="text-lg" />
          Ver todas las reseñas en Google
        </a>
      </div>
    </section>
  )
}
