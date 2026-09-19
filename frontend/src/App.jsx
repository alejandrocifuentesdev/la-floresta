import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Agenda from './pages/Agenda.jsx'
import Businesses from './pages/Businesses.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/comercos" element={<Businesses />} />
      </Routes>
    </BrowserRouter>
  )
}
