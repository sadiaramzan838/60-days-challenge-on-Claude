import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getClientById, saveClient } from '../utils/storage'

function ClientForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState({
    name: '',
    niche: '',
    tone: '',
    goal: '',
    pastPostExamples: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing) {
      const existing = getClientById(id)
      if (existing) {
        setForm({
          name: existing.name || '',
          niche: existing.niche || '',
          tone: existing.tone || '',
          goal: existing.goal || '',
          pastPostExamples: existing.pastPostExamples || '',
        })
      }
    }
  }, [id, isEditing])

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError('Client name is required.')
      return
    }
    setError('')

    const saved = saveClient(isEditing ? { ...form, id } : form)
    navigate(`/client/${saved.id}`)
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <Link to="/" className="text-blue-600 text-sm">&larr; Back</Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
        {isEditing ? 'Edit Client' : 'New Client'}
      </h1>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Bloom Bakery"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Bakery"
            value={form.niche}
            onChange={handleChange('niche')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand Tone</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Fun, warm, playful"
            value={form.tone}
            onChange={handleChange('tone')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Goal</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Promote weekend sale"
            value={form.goal}
            onChange={handleChange('goal')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Past Post Examples</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 h-24"
            placeholder="Paste 2-3 example captions here"
            value={form.pastPostExamples}
            onChange={handleChange('pastPostExamples')}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Link to="/" className="border px-4 py-2 rounded-lg">Cancel</Link>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Save Client
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientForm