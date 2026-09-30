import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <nav className="footer-links" aria-label="Enllaços legals">
        <Link to="/contacte">Contacte</Link><span aria-hidden="true">|</span>
        <Link to="/avis-legal">Avís legal</Link><span aria-hidden="true">|</span>
        <Link to="/privacitat">Privacitat</Link>
      </nav>
    </footer>
  )
}
