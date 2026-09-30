import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const CONTACT_EMAIL = 'contacte@la-floresta.example'

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="info-page">
        <article className="section info-content compact-info-content">
          <h1>Contacte</h1>
          <p>Tens alguna proposta, correcció o informació sobre La Floresta?</p>
          <p>Pots posar-te en contacte per correu electrònic:</p>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p className="placeholder-note">Adreça provisional: cal substituir-la abans de publicar.</p>
        </article>
      </main>
      <Footer />
    </>
  )
}
