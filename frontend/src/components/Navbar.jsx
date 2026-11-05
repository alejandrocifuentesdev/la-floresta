
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { label: 'Inici', to: '/', end: true },
  { label: 'Agenda', to: '/agenda' },
  { label: 'Cursos i tallers', to: '/cursos-tallers' },
  { label: 'Mapa', to: '/mapa' },
  { label: 'Comerços i serveis', to: '/comercos' },
  { label: 'Sobre La Floresta', to: '/sobre-la-floresta' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        aria-label="La Floresta, inici"
        onClick={() => setMenuOpen(false)}
      >
        <strong className="brand-name">La Floresta</strong>

        <img
          src="/images/boar-logo.png"
          alt=""
          className="boar-logo"
        />
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label="Obre el menú"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={menuOpen ? 'main-nav is-open' : 'main-nav'}
        aria-label="Navegació principal"
      >
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? 'active' : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
