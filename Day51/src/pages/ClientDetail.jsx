import { Link, useParams } from 'react-router-dom'
import GenerationResult from '../components/GenerationResult'
import HistoryList from '../components/HistoryList'

function ClientDetail() {
  const { id } = useParams()

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link to="/" className="text-blue-600 text-sm">&larr; Back</Link>

      <div className="flex justify-between items-center mt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bloom Bakery</h1>
          <p className="text-sm text-gray-500">Bakery &middot; Client ID: {id}</p>
        </div>
        <div className="flex gap-2">
          <button className="border px-3 py-1.5 rounded-lg text-sm">Edit</button>
          <button className="border border-red-300 text-red-600 px-3 py-1.5 rounded-lg text-sm">Delete</button>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium mb-8">
        Generate Content
      </button>

      <GenerationResult />
      <HistoryList />
    </div>
  )
}

export default ClientDetail