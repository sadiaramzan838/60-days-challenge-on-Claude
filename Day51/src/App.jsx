import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ClientForm from './pages/ClientForm'
import ClientDetail from './pages/ClientDetail'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/client/new" element={<ClientForm />} />
            <Route path="/client/:id/edit" element={<ClientForm />} />
            <Route path="/client/:id" element={<ClientDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App