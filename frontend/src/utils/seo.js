export const SITE_URL = 'https://laflorestapearson.cat'
export const DEFAULT_IMAGE = `${SITE_URL}/images/la-floresta-landscape.png`

export const PAGE_METADATA = {
  '/': {
    title: 'La Floresta | Agenda, concerts, festes i vida de barri',
    description: 'Descobreix què fer a La Floresta, Sant Cugat del Vallès. Agenda de concerts, festes i esdeveniments, cursos, tallers, comerços i serveis del barri.',
  },
  '/agenda': {
    title: 'Agenda de La Floresta | Concerts, festes i esdeveniments',
    description: 'Consulta els propers concerts, festes, vermuts musicals i activitats a La Floresta, Sant Cugat del Vallès. Dates, llocs i informació de cada esdeveniment.',
  },
  '/cursos-tallers': {
    title: 'Cursos i tallers a La Floresta | Activitats i formació',
    description: 'Troba cursos i tallers a La Floresta, Sant Cugat del Vallès. Consulta les propostes, dates, horaris, espais i informació per inscriure-t’hi.',
  },
  '/comercos': {
    title: 'Comerços i serveis de La Floresta | Guia local',
    description: 'Descobreix les botigues, bars, restaurants i serveis de La Floresta, Sant Cugat del Vallès. Consulta adreces i dades de contacte dels negocis del barri.',
  },
  '/professionals': {
    title: 'Professionals locals de La Floresta | Serveis de proximitat',
    description: 'Consulta els professionals de La Floresta i els seus serveis de proximitat. Informació i contacte de professionals del barri de Sant Cugat del Vallès.',
  },
  '/mapa': {
    title: 'Mapa de La Floresta | Punts d’interès i espais del barri',
    description: 'Explora el mapa de La Floresta, Sant Cugat del Vallès, i localitza punts d’interès, espais culturals i serveis del barri.',
  },
  '/sobre-la-floresta': {
    title: 'Sobre La Floresta | Una guia per viure el barri',
    description: 'Coneix el projecte de guia local de La Floresta, a Sant Cugat del Vallès, per descobrir activitats, comerços, serveis i espais del barri.',
  },
  '/contacte': {
    title: 'Contacte | Guia de La Floresta',
    description: 'Contacta amb la guia de La Floresta per compartir activitats, proposar contingut o comunicar correccions sobre la informació del barri.',
  },
  '/avis-legal': {
    title: 'Avís legal | Guia de La Floresta',
    description: 'Consulta l’avís legal i les condicions d’ús de la guia local de La Floresta.',
  },
  '/privacitat': {
    title: 'Política de privacitat | Guia de La Floresta',
    description: 'Consulta la política de privacitat de la guia local de La Floresta.',
  },
}

export function absoluteUrl(path) {
  const url = new URL(path, SITE_URL)
  return /^https?:$/.test(url.protocol) ? url.href : DEFAULT_IMAGE
}

export function activityMetadata(activity, type = 'Event') {
  if (!activity) return {}

  const date = new Date(`${activity.date}T12:00:00`)
  const dateLabel = Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
  const metadata = {
    title: `${activity.title} a La Floresta${dateLabel ? ` | ${dateLabel}` : ''}`,
    description: [activity.description, activity.location].filter(Boolean).join(' · '),
    image: activity.imageUrl ? absoluteUrl(activity.imageUrl) : DEFAULT_IMAGE,
  }

  if (!Number.isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(activity.date) && activity.location) {
    metadata.structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      name: activity.title,
      description: activity.description,
      startDate: activity.date,
      image: metadata.image,
      location: {
        '@type': 'Place',
        name: activity.location,
        address: activity.location,
      },
      ...(activity.organizer ? { organizer: { '@type': 'Organization', name: activity.organizer } } : {}),
    }
  }
  return metadata
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

export function renderSeoHead(path, metadata) {
  const url = `${SITE_URL}${path}`
  return `<title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    ${path === '/' ? '' : `<link rel="canonical" href="${url}" />`}
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="La Floresta" />
    <meta property="og:locale" content="ca_ES" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${DEFAULT_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${DEFAULT_IMAGE}" />`
}
