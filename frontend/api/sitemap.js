import { escapeHtml, PAGE_METADATA, SITE_URL } from '../src/utils/seo.js'

const collections = [
  ['events', '/agenda'],
  ['courses-workshops', '/cursos-tallers'],
  ['businesses', '/comercos'],
  ['professionals', '/professionals'],
  ['points-of-interest', '/llocs'],
]

export default async function handler(request, response) {
  const results = await Promise.allSettled(collections.map(async ([endpoint, path]) => {
    const result = await fetch(`https://la-floresta-production.up.railway.app/api/${endpoint}`, { signal: AbortSignal.timeout(5000) })
    if (!result.ok) throw new Error(`Sitemap source returned ${result.status}`)
    const items = await result.json()
    if (!Array.isArray(items)) throw new Error('Invalid sitemap source')
    return items.filter((item) => /^\d+$/.test(String(item.id))).map((item) => `${path}/${item.id}`)
  }))
  const paths = new Set(Object.keys(PAGE_METADATA))
  for (const result of results) {
    if (result.status === 'fulfilled') {
      for (const path of result.value) paths.add(path)
    }
  }
  const complete = results.every((result) => result.status === 'fulfilled')
  response.setHeader('Content-Type', 'application/xml; charset=utf-8')
  response.setHeader('Cache-Control', complete ? 'public, s-maxage=300, stale-while-revalidate=600' : 'public, s-maxage=30')
  response.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...paths].map((path) => `  <url><loc>${escapeHtml(`${SITE_URL}${path}`)}</loc></url>`).join('\n')}\n</urlset>\n`)
}
