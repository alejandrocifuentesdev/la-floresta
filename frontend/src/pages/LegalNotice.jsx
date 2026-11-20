import Seo from '../components/Seo.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const OWNER_EMAIL = 'contactelafloresta@gmail.com'

export default function LegalNotice() {
  return (
    <>
      <Seo />
      <Navbar />
      <main className="info-page">
        <article className="section info-content legal-content">
          <h1>Avís legal</h1>

          <section>
            <h2>Contacte</h2>
            <p>Correu de contacte: <strong>{OWNER_EMAIL}</strong>.</p>
          </section>

          <section>
            <h2>Finalitat del projecte</h2>
            <p>La Floresta és una guia local informativa sobre l'agenda, els comerços, els serveis i els punts d'interès del barri.</p>
          </section>

          <section>
            <h2>Continguts</h2>
            <p>Es procura que els continguts siguin clars i correctes, però poden estar incomplets, quedar desactualitzats o contenir errors. La informació publicada no substitueix les fonts oficials.</p>
          </section>

          <section>
            <h2>Enllaços externs</h2>
            <p>El lloc pot incloure enllaços o recursos de tercers. Aquests llocs tenen els seus propis continguts i polítiques.</p>
          </section>

        </article>
      </main>
      <Footer />
    </>
  )
}
