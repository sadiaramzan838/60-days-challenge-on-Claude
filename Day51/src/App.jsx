import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ClientForm from './pages/ClientForm'
import ClientDetail from './pages/ClientDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/client/new" element={<ClientForm />} />
        <Route path="/client/:id/edit" element={<ClientForm />} />
        <Route path="/client/:id" element={<ClientDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App