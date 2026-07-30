import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getClients } from '../utils/storage'
import ProfileCard from '../components/ProfileCard'

function Dashboard() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    setClients(getClients())
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Clients</h1>
        <Link
          to="/client/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          + New Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-white">
          <div className="text-4xl mb-3">✦</div>
          <p className="text-gray-500 mb-4">No clients yet — add your first one</p>
          <Link
            to="/client/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            + New Client
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Link
              key={client.id}
              to={`/client/${client.id}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl"
            >
              <ProfileCard name={client.name} niche={client.niche} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard