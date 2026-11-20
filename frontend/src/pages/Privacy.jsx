import { useContext } from 'react'
import Seo from '../components/Seo.jsx'
import { CookieSettingsContext } from '../components/AnalyticsConsent.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function Privacy() {
  const openCookieSettings = useContext(CookieSettingsContext)
  return (
    <>
      <Seo />
      <Navbar />
      <main className="info-page">
        <article className="section info-content legal-content">
          <h1>Privacitat i cookies</h1>

          <section>
            <h2>Dades personals i contacte</h2>
            <p>La navegació pública no requereix registre. El responsable del tractament és Alejandro Cifuentes Batista (contactelafloresta@gmail.com). Les dades que ens facilitis per correu electrònic es tracten per gestionar les consultes i propostes, sobre la base de l'interès legítim a atendre-les, i es conserven durant el temps necessari per fer-ho i complir les obligacions legals aplicables.</p>
          </section>

          <section>
            <h2>Serveis externs i cookies</h2>
            <p>Els serveis d'allotjament, Google Fonts i OpenStreetMap poden tractar dades tècniques, com ara l'adreça IP, per prestar els seus serveis. El correu electrònic es gestiona mitjançant Gmail. Aquests proveïdors poden tractar dades fora de l'Espai Econòmic Europeu segons les seves condicions i garanties aplicables.</p>
          </section>

          <section id="cookies">
            <h2>Cookies i preferències</h2>
            <p>Les cookies són petits fitxers que el navegador desa al teu dispositiu. Les cookies d’analítica són opcionals: Google Analytics no es carrega fins que les acceptes. Rebutjar-les o tancar l’avís sense haver-les acceptat permet continuar navegant sense activar l’analítica.</p>
            <div className="cookie-table-wrapper">
              <table className="cookie-table">
                <caption>Cookies d’analítica de Google Analytics</caption>
                <thead><tr><th scope="col">Nom</th><th scope="col">Finalitat</th><th scope="col">Durada</th></tr></thead>
                <tbody>
                  <tr><td><code>_ga</code></td><td>Distingir els navegadors que visiten la web.</td><td>180 dies des de l’última actualització.</td></tr>
                  <tr><td><code>_ga_*</code></td><td>Mantenir l’estat de les sessions de navegació.</td><td>180 dies des de l’última actualització.</td></tr>
                </tbody>
              </table>
            </div>
            <p>També desem al navegador la teva decisió durant 180 dies. Aquesta preferència serveix per recordar si has acceptat o rebutjat l’analítica i no s’utilitza per fer seguiment.</p>
            <p>Pots canviar la decisió amb «Configurar cookies», aquí o al peu de pàgina. En retirar el consentiment, aturem la recollida de noves dades i eliminem les cookies de Google Analytics d’aquest domini. Això no esborra automàticament les dades que ja s’hagin enviat a Google. La web continua disponible amb qualsevol opció.</p>
            <button type="button" className="cookie-policy-settings" aria-haspopup="dialog" onClick={() => openCookieSettings(true)}>Configurar cookies</button>
          </section>

          <section>
            <h2>Google Analytics i dades de navegació</h2>
            <p>Si acceptes les cookies d’analítica, activem Google Analytics 4, un servei de Google Ireland Limited, per mesurar les visites i entendre quines pàgines es consulten. Es tracten identificadors de cookies i dades de navegació, procedència de les visites i dispositiu. La base del tractament és el teu consentiment.</p>
            <p>La configuració d’aquesta web manté desactivats Google signals i la personalització publicitària. Google pot tractar les dades fora de l’Espai Econòmic Europeu d’acord amb les seves garanties aplicables. Pots consultar la <a href="https://policies.google.com/privacy?hl=ca" target="_blank" rel="noreferrer">política de privacitat de Google</a> i la <a href="https://support.google.com/analytics/answer/6004245?hl=ca" target="_blank" rel="noreferrer">informació sobre com Google Analytics protegeix les dades</a>.</p>
            <p>La durada de les cookies i la conservació de les dades als servidors de Google són coses diferents. Les dades associades a usuaris i esdeveniments es conserven durant el termini establert als ajustos de Google Analytics i s’eliminen automàticament quan venç. Les estadístiques agregades no estan subjectes al mateix termini. Pots consultar la <a href="https://support.google.com/analytics/answer/7667196?hl=ca" target="_blank" rel="noreferrer">informació de Google sobre la conservació de dades</a>.</p>
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
