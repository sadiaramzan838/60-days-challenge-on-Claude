import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  getClientById,
  deleteClient,
  getHistory,
  saveHistoryEntry,
  deleteHistoryEntry,
} from '../utils/storage'
import { generateContent } from '../utils/api'
import GenerationResult from '../components/GenerationResult'
import HistoryList from '../components/HistoryList'
import LoadingSkeleton from '../components/LoadingSkeleton'

function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const found = getClientById(id)
    if (found) {
      setClient(found)
      setHistory(getHistory(id))
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
      saveHistoryEntry({ clientId: id, ...data })
      setHistory(getHistory(id))
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectHistory = (entry) => {
    setResult(entry)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteHistory = (entryId) => {
    const confirmed = window.confirm('Delete this history entry?')
    if (confirmed) {
      deleteHistoryEntry(entryId)
      setHistory(getHistory(id))
    }
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center py-20">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-gray-500 mb-4">Client not found.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Clients
        </Link>
      </div>
    )
  }

  if (!client) return null

  return (
    <div className="max-w-3xl mx-auto p-8">
      <p className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-blue-600 transition-colors">Clients</Link>
        {' / '}{client.name}
      </p>

      <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{client.name}</h1>
          <p className="text-sm text-gray-500">{client.niche}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/client/${id}/edit`}
            className="border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="border border-red-300 text-red-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            Delete
          </button>
        </div>
      </div>

      {!result && !isLoading && (
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium mb-6 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Generate Content
        </button>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-6 flex items-center gap-2">
          <span>⚠</span> {error}
        </div>
      )}

      {isLoading && <LoadingSkeleton />}

      {result && !isLoading && (
        <>
          <GenerationResult result={result} />
          <button
            onClick={handleGenerate}
            className="border px-4 py-2 rounded-lg text-sm mb-8 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            ↻ Regenerate
          </button>
        </>
      )}

      <HistoryList
        entries={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />
    </div>
  )
}

export default ClientDetail