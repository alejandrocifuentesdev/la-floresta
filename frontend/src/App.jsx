import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Agenda from './pages/Agenda.jsx'
import CoursesWorkshops from './pages/CoursesWorkshops.jsx'
import CourseWorkshopDetail from './pages/CourseWorkshopDetail.jsx'
import AdminCoursesWorkshops from './pages/admin/AdminCoursesWorkshops.jsx'
import AdminEvents from './pages/admin/AdminEvents.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminBusinesses from './pages/admin/AdminBusinesses.jsx'
import AdminPointsOfInterest from './pages/admin/AdminPointsOfInterest.jsx'
import About from './pages/About.jsx'
import Businesses from './pages/Businesses.jsx'
import BusinessDetail from './pages/BusinessDetail.jsx'
import Contact from './pages/Contact.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Home from './pages/Home.jsx'
import LegalNotice from './pages/LegalNotice.jsx'
import Map from './pages/Map.jsx'
import NotFound from './pages/NotFound.jsx'
import Privacy from './pages/Privacy.jsx'
import PointOfInterestDetail from './pages/PointOfInterestDetail.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import ProtectedAdminRoute from './pages/admin/ProtectedAdminRoute.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/cursos-tallers" element={<AdminCoursesWorkshops />} />
          <Route path="/admin/activitats" element={<AdminEvents />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/comercos" element={<AdminBusinesses />} />
          <Route path="/admin/llocs" element={<AdminPointsOfInterest />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/cursos-tallers" element={<CoursesWorkshops />} />
        <Route path="/cursos-tallers/:id" element={<CourseWorkshopDetail />} />
        <Route path="/agenda/:id" element={<EventDetail />} />
        <Route path="/avis-legal" element={<LegalNotice />} />
        <Route path="/comercos" element={<Businesses />} />
        <Route path="/comercos/:id" element={<BusinessDetail />} />
        <Route path="/contacte" element={<Contact />} />
        <Route path="/mapa" element={<Map />} />
        <Route path="/llocs/:id" element={<PointOfInterestDetail />} />
        <Route path="/privacitat" element={<Privacy />} />
        <Route path="/sobre-la-floresta" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
