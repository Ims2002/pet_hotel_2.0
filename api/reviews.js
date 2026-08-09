// Vercel Serverless Function — obtiene las reseñas de Google Business Profile
// mediante Google Places API (New). La API key nunca se expone al navegador,
// solo vive en el servidor a través de variables de entorno.
//
// Variables de entorno necesarias (configúralas en Vercel:
// Project Settings → Environment Variables, y también en .env.local para
// desarrollo local con `vercel dev`):
//   GOOGLE_PLACES_API_KEY  -> tu API key de Google Cloud
//   GOOGLE_PLACE_ID        -> el Place ID de la ficha de Google Business

export default async function handler(req, res) {
  const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env

  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    return res.status(500).json({
      error: 'Faltan las variables de entorno GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID.',
    })
  }

  const fieldMask = 'id,displayName,rating,userRatingCount,googleMapsUri,reviews'
  const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=es`

  try {
    const googleRes = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': fieldMask,
      },
    })

    if (!googleRes.ok) {
      const detail = await googleRes.text()
      return res.status(googleRes.status).json({ error: 'Error de Google Places API', detail })
    }

    const data = await googleRes.json()

    const reviews = (data.reviews || []).map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Anónimo',
      photo: r.authorAttribution?.photoUri ?? null,
      profileUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating ?? null,
      text: r.text?.text ?? '',
      relativeTime: r.relativePublishTimeDescription ?? '',
    }))

    // Cachea 6h en el edge de Vercel para no consumir cuota en cada visita.
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400')

    return res.status(200).json({
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      reviews,
    })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo contactar con Google Places API.', detail: String(err) })
  }
}
