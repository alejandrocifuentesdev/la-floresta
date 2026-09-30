import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="info-page">
        <article className="section info-content">
          <h1>Sobre La Floresta</h1>
          <img
            className="about-image"
            src="/images/la-floresta-landscape.png"
            alt="Entorn de La Floresta"
          />

          <section>
            <h2>La Floresta</h2>
            <p>La Floresta és un nucli de Sant Cugat del Vallès amb una identitat pròpia, formada al voltant de la vida veïnal i de la seva relació estreta amb el territori.</p>
          </section>

          <section>
            <h2>Història</h2>
            <p>El desenvolupament de La Floresta està vinculat, de manera general, al creixement residencial de la zona i a l'arribada del ferrocarril, que va facilitar-ne la connexió amb altres nuclis. Aquest apartat queda preparat per incorporar més endavant informació històrica contrastada.</p>
          </section>

          <section>
            <h2>Entorn</h2>
            <p>La proximitat amb Collserola forma part del caràcter de La Floresta. El bosc, els camins i el relleu condicionen el paisatge i la relació quotidiana entre el nucli habitat i el seu entorn natural.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
