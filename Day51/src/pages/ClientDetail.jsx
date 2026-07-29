import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getClientById, deleteClient } from '../utils/storage'
import { generateContent } from '../utils/api'
import GenerationResult from '../components/GenerationResult'
import HistoryList from '../components/HistoryList'

function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const found = getClientById(id)
    if (found) {
      setClient(found)
    } else {
      setNotFound(true)
    }
  }, [id])

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete "${client.name}"? This cannot be undone.`)
    if (confirmed) {
      deleteClient(id)
      navigate('/')
    }
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await generateContent(client)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Link to="/" className="text-blue-600 text-sm">&larr; Back</Link>
        <p className="mt-4 text-gray-500">Client not found.</p>
      </div>
    )
  }

  if (!client) return null

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link to="/" className="text-blue-600 text-sm">&larr; Back</Link>

      <div className="flex justify-between items-center mt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-sm text-gray-500">{client.niche}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/client/${id}/edit`} className="border px-3 py-1.5 rounded-lg text-sm">
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="border border-red-300 text-red-600 px-3 py-1.5 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium mb-4 disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2 mb-6">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="border rounded-lg p-5 mb-8 text-gray-400 text-sm">
          Generating content...
        </div>
      )}

      <GenerationResult result={result} />
      <HistoryList />
    </div>
  )
}

export default ClientDetail