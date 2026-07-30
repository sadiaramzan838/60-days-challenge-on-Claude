import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ClientForm from './pages/ClientForm'
import ClientDetail from './pages/ClientDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
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
    </ErrorBoundary>
  )
}

export default App