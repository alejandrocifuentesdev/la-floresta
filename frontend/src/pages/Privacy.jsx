import Seo from '../components/Seo.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function Privacy() {
  return (
    <>
      <Seo />
      <Navbar />
      <main className="info-page">
        <article className="section info-content legal-content">
          <h1>Privacitat</h1>

          <section>
            <h2>Dades personals i contacte</h2>
            <p>La navegació pública no requereix registre. El responsable del tractament és Alejandro Cifuentes Batista (contactelafloresta@gmail.com). Les dades que ens facilitis per correu electrònic es tracten per gestionar les consultes i propostes, sobre la base de l'interès legítim a atendre-les, i es conserven durant el temps necessari per fer-ho i complir les obligacions legals aplicables.</p>
          </section>

          <section>
            <h2>Serveis externs i cookies</h2>
            <p>El lloc no incorpora eines pròpies de seguiment publicitari ni d'analítica. Els serveis d'allotjament, Google Fonts i OpenStreetMap poden tractar dades tècniques, com ara l'adreça IP, per prestar els seus serveis. El correu electrònic es gestiona mitjançant Gmail. Aquests proveïdors poden tractar dades fora de l'Espai Econòmic Europeu segons les seves condicions i garanties aplicables.</p>
          </section>

          <section>
            <h2>Drets</h2>
            <p>Pots sol·licitar l'accés, la rectificació, la supressió, la limitació, l'oposició i, quan sigui aplicable, la portabilitat de les teves dades escrivint a contactelafloresta@gmail.com. També pots presentar una reclamació davant l'<a href="https://www.aepd.es/">Agència Espanyola de Protecció de Dades</a>.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
