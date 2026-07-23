import { Link } from 'react-router-dom'

function Dashboard() {
  const dummyClients = [
    { id: '1', name: 'Bloom Bakery', niche: 'Bakery' },
    { id: '2', name: 'FitCore Studio', niche: 'Fitness Coaching' },
  ]

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Clients</h1>
        <Link
          to="/client/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          + New Client
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyClients.map((client) => (
          <Link
            key={client.id}
            to={`/client/${client.id}`}
            className="border rounded-lg p-5 hover:shadow-md transition"
          >
            <h2 className="font-semibold text-gray-900">{client.name}</h2>
            <p className="text-sm text-gray-500">{client.niche}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard