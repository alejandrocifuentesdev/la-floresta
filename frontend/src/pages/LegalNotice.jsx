import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const SITE_OWNER = '[NOM COMPLET DEL TITULAR — PENDENT DE COMPLETAR]'
const OWNER_EMAIL = '[CORREU ELECTRÒNIC DEL TITULAR — PENDENT DE COMPLETAR]'

export default function LegalNotice() {
  return (
    <>
      <Navbar />
      <main className="info-page">
        <article className="section info-content legal-content">
          <h1>Avís legal</h1>

          <section>
            <h2>Titularitat del lloc</h2>
            <p>Aquest lloc web és titularitat de <strong>{SITE_OWNER}</strong>.</p>
            <p>Correu de contacte: <strong>{OWNER_EMAIL}</strong>.</p>
          </section>

          <section>
            <h2>Finalitat del projecte</h2>
            <p>La Floresta és un projecte web informatiu i de portfolio. El seu objectiu és presentar de manera accessible informació relacionada amb La Floresta i el seu entorn.</p>
          </section>

          <section>
            <h2>Continguts</h2>
            <p>Es procura que els continguts siguin clars i correctes, però poden estar incomplets, quedar desactualitzats o contenir errors. La informació publicada no substitueix les fonts oficials.</p>
          </section>

          <section>
            <h2>Enllaços externs</h2>
            <p>El lloc pot incloure enllaços o recursos de tercers. El titular no controla els seus continguts, la seva disponibilitat ni les seves polítiques.</p>
          </section>

          <section>
            <h2>Responsabilitat</h2>
            <p>El titular no es responsabilitza de les conseqüències derivades de l'ús de la informació publicada ni de les interrupcions o incidències tècniques alienes al projecte.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
