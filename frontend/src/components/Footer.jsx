import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CookieSettingsContext } from './AnalyticsConsent.jsx'

export default function Footer() {
  const openCookieSettings = useContext(CookieSettingsContext)
  return (
    <footer className="site-footer" id="footer">
      <nav className="footer-links" aria-label="Enllaços legals">
        <Link to="/contacte">Contacte</Link><span aria-hidden="true">|</span>
        <Link to="/avis-legal">Avís legal</Link><span aria-hidden="true">|</span>
        <Link to="/privacitat">Privacitat i cookies</Link><span aria-hidden="true">|</span>
        <button type="button" className="cookie-settings" aria-haspopup="dialog" onClick={() => openCookieSettings(true)}>Configurar cookies</button>
      </nav>
    </footer>
  )
}
