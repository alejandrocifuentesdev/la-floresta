import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="info-page">
        <article className="section info-content compact-info-content">
          <h1>Pàgina no trobada</h1>
          <p>La pàgina que busques no existeix o ja no està disponible.</p>
          <Link className="back-link" to="/">Torna a l’inici</Link>
        </article>
      </main>
      <Footer />
    </>
  )
}
