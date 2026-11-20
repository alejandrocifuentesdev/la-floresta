import { createContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CONSENT_KEY, clearAnalyticsCookies, disableAnalytics, enableAnalytics, readConsent, saveConsent } from '../utils/analytics.js'

export const CookieSettingsContext = createContext(null)

export default function AnalyticsConsent({ children }) {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const [choice, setChoice] = useState(readConsent)
  const [showBanner, setShowBanner] = useState(!choice)

  useEffect(() => {
    if (choice === 'accepted' && !isAdmin) enableAnalytics()
    else disableAnalytics()
  }, [choice, isAdmin])

  useEffect(() => {
    function updateFromStorage(event) {
      if (event.key !== CONSENT_KEY && event.key !== null) return
      const nextChoice = readConsent()
      setChoice(nextChoice)
      setShowBanner(!nextChoice)
      if (nextChoice !== 'accepted') {
        disableAnalytics()
        clearAnalyticsCookies()
        if (document.getElementById('google-analytics')) location.reload()
      }
    }
    window.addEventListener('storage', updateFromStorage)
    return () => window.removeEventListener('storage', updateFromStorage)
  }, [])

  function choose(nextChoice) {
    saveConsent(nextChoice)
    setChoice(nextChoice)
    setShowBanner(false)
    if (nextChoice === 'rejected') {
      disableAnalytics()
      clearAnalyticsCookies()
      if (document.getElementById('google-analytics')) location.reload()
    }
  }

  return (
    <CookieSettingsContext.Provider value={setShowBanner}>
      {children}
      {showBanner && !isAdmin && (
        <section className="cookie-banner" role="dialog" aria-labelledby="cookie-heading" aria-describedby="cookie-description">
          <h2 id="cookie-heading">Cookies d’analítica</h2>
          <p id="cookie-description">Amb el teu permís, fem servir Google Analytics per saber quantes persones visiten la web i quines pàgines consulten. Pots acceptar o rebutjar les cookies d’analítica i canviar la decisió a «Cookies», al peu de pàgina.</p>
          <Link className="cookie-policy-link" to="/privacitat">Més informació sobre privacitat i cookies</Link>
          <div className="cookie-actions">
            <button type="button" onClick={() => choose('rejected')}>Rebutjar</button>
            <button type="button" onClick={() => choose('accepted')}>Acceptar analítica</button>
            {choice && <button type="button" onClick={() => setShowBanner(false)}>Tancar</button>}
          </div>
        </section>
      )}
    </CookieSettingsContext.Provider>
  )
}
