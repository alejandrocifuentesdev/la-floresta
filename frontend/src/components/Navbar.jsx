import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { label: 'Inici', to: '/', end: true },
  { label: 'Agenda', to: '/agenda' },
  { label: 'Mapa', href: '#llocs' },
  { label: 'Comerços i serveis', to: '/comercos' },
  { label: 'Rutes', href: '#rutes' },
  { label: 'Sobre La Floresta', href: '#footer' },
]

function BoarLogo() {
  return (
    <svg className="boar-logo" viewBox="0 0 64 36" aria-hidden="true">
      <path d="M7 16c2-6 9-10 18-10 7-4 18-3 24 3l7 1 4 5-5 4-6-1c-2 6-9 9-18 9H18l-3 6h-4l1-8c-4-2-7-5-5-9Zm43-7-2-6 6 5M23 26l-1 7h4l4-6M40 26l2 7h4l-1-9M8 15 3 12l3 7" fill="currentColor"/>
      <circle cx="52" cy="13" r="1" fill="white" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="La Floresta, inici"><BoarLogo /><strong>La Floresta</strong></Link>
      <button className="menu-button" type="button" aria-label="Obre el menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegació principal">
        {links.map((link) => link.to ? (
          <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to={link.to} end={link.end} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
        ) : (
          <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
      </nav>
    </header>
  )
}
