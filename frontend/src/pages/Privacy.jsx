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
            <p>Els serveis d'allotjament, Google Fonts i OpenStreetMap poden tractar dades tècniques, com ara l'adreça IP, per prestar els seus serveis. El correu electrònic es gestiona mitjançant Gmail. Aquests proveïdors poden tractar dades fora de l'Espai Econòmic Europeu segons les seves condicions i garanties aplicables.</p>
          </section>

          <section>
            <h2>Google Analytics i consentiment</h2>
            <p>Si acceptes les cookies d’analítica, activem Google Analytics 4, un servei de Google Ireland Limited, per mesurar les visites i entendre quines pàgines es consulten. Es tracten identificadors de cookies i dades de navegació, procedència de les visites i dispositiu. La base del tractament és el teu consentiment.</p>
            <p>La configuració d’aquesta web manté desactivats Google signals i la personalització publicitària. Google pot tractar les dades fora de l’Espai Econòmic Europeu d’acord amb les seves garanties aplicables. Pots consultar la <a href="https://policies.google.com/privacy?hl=ca" target="_blank" rel="noreferrer">política de privacitat de Google</a> i la <a href="https://support.google.com/analytics/answer/6004245?hl=ca" target="_blank" rel="noreferrer">informació sobre com Google Analytics protegeix les dades</a>.</p>
            <p>Les cookies <code>_ga</code> i <code>_ga_*</code> permeten distingir navegadors i sessions. Les configurem amb una durada màxima de sis mesos des de l’última actualització. També guardem localment la teva elecció durant sis mesos per recordar-la.</p>
            <p>Pots acceptar, rebutjar o retirar el consentiment en qualsevol moment amb el botó «Cookies» del peu de pàgina. En rebutjar l’analítica, s’atura la recollida i s’eliminen les cookies de Google Analytics d’aquest domini. La web continua disponible amb qualsevol de les opcions.</p>
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
