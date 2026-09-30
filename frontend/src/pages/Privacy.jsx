import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="info-page">
        <article className="section info-content legal-content">
          <h1>Privacitat</h1>

          <section>
            <h2>Dades personals</h2>
            <p>En el funcionament actual del projecte no hi ha comptes d'usuari, registre ni formulari de contacte. L'aplicació no pretén recollir ni emmagatzemar dades personals dels visitants.</p>
          </section>

          <section>
            <h2>Analítica i seguiment</h2>
            <p>No s'han implementat eines pròpies d'analítica o seguiment, ni cookies pròpies destinades a seguir l'activitat dels visitants.</p>
          </section>

          <section>
            <h2>Serveis tècnics externs</h2>
            <p>Quan l'aplicació es desplegui, els serveis d'allotjament i els recursos externs utilitzats podran efectuar els tractaments tècnics necessaris per prestar el servei, d'acord amb les seves pròpies condicions i polítiques de privacitat.</p>
          </section>

          <section>
            <h2>Canvis en el projecte</h2>
            <p>Si en el futur s'incorporen funcionalitats que tractin dades personals, analítica o mecanismes de seguiment, aquesta informació s'haurà d'actualitzar abans de posar-les en funcionament.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
