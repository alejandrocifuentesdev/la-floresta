export const MEASUREMENT_ID = 'G-S5SGN7VZQX'
export const CONSENT_KEY = 'la-floresta-analytics-consent'
const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000

export function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY))
    if (saved?.expires > Date.now() && ['accepted', 'rejected'].includes(saved.choice)) return saved.choice
  } catch {
    // Browsing remains available when storage is disabled.
  }
  return null
}

export function saveConsent(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, expires: Date.now() + CONSENT_DURATION }))
  } catch {
    // The choice still applies to the current page session.
  }
}

export function enableAnalytics() {
  window[`ga-disable-${MEASUREMENT_ID}`] = false
  if (document.getElementById('google-analytics')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: CONSENT_DURATION / 1000,
  })

  // GA4 enhanced measurement tracks React Router's History API navigation.
  const script = document.createElement('script')
  script.id = 'google-analytics'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  script.onerror = () => script.remove()
  document.head.append(script)
}

export function disableAnalytics() {
  window[`ga-disable-${MEASUREMENT_ID}`] = true
}

export function clearAnalyticsCookies() {
  const domains = ['', location.hostname, `.${location.hostname}`]
  const parentDomain = location.hostname.split('.').slice(1).join('.')
  if (parentDomain.includes('.')) domains.push(`.${parentDomain}`)
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0]
    if (name !== '_ga' && !name.startsWith('_ga_')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ''} SameSite=Lax`
    }
  }
}
