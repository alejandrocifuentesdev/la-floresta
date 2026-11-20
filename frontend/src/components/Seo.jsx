import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, DEFAULT_IMAGE, PAGE_METADATA, SITE_URL } from '../utils/seo.js'

export default function Seo({ title, description, image, structuredData, noindex = false }) {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'
  const section = `/${path.split('/')[1]}`
  const defaults = PAGE_METADATA[path] || PAGE_METADATA[section] || PAGE_METADATA['/']
  const pageTitle = title || defaults.title
  const pageDescription = description || defaults.description
  const pageImage = image ? absoluteUrl(image) : DEFAULT_IMAGE
  const url = `${SITE_URL}${path}`
  const jsonLd = structuredData ? JSON.stringify({ ...structuredData, url }) : ''

  useEffect(() => {
    document.title = pageTitle
    const values = {
      'name:description': pageDescription,
      'name:robots': noindex ? 'noindex, follow' : 'index, follow',
      'property:og:type': 'website',
      'property:og:site_name': 'La Floresta',
      'property:og:locale': 'ca_ES',
      'property:og:title': pageTitle,
      'property:og:description': pageDescription,
      'property:og:url': url,
      'property:og:image': pageImage,
      'name:twitter:card': 'summary_large_image',
      'name:twitter:title': pageTitle,
      'name:twitter:description': pageDescription,
      'name:twitter:image': pageImage,
    }
    for (const [key, content] of Object.entries(values)) {
      const [attribute, ...name] = key.split(':')
      const value = name.join(':')
      let tag = document.head.querySelector(`meta[${attribute}="${value}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, value)
        document.head.append(tag)
      }
      tag.content = content
    }
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = url

    document.getElementById('page-structured-data')?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = 'page-structured-data'
      script.type = 'application/ld+json'
      script.textContent = jsonLd
      document.head.append(script)
    }
    return () => document.getElementById('page-structured-data')?.remove()
  }, [pageTitle, pageDescription, pageImage, url, noindex, jsonLd])

  return null
}
