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
    const missing = []
    if (!form.name.trim()) missing.push('Client Name')
    if (!form.niche.trim()) missing.push('Niche')
    if (!form.tone.trim()) missing.push('Brand Tone')
    if (!form.goal.trim()) missing.push('Current Goal')

    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(', ')}.`)
      return
    }
    setError('')

    try {
      const saved = saveClient(isEditing ? { ...form, id } : form)
      navigate(`/client/${saved.id}`)
    } catch (err) {
      setError(err.message || 'Something went wrong saving this client.')
    }
  }

  const inputClass =
    'w-full border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

  return (
    <div className="max-w-xl mx-auto p-8">
      <p className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-blue-600 transition-colors">Clients</Link>
        {' / '}{isEditing ? 'Edit' : 'New'}
      </p>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
        {isEditing ? 'Edit Client' : 'New Client'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
          <span>⚠</span> {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input
            id="name"
            maxLength={80}
            className={inputClass}
            placeholder="e.g. Bloom Bakery"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div>
          <label htmlFor="niche" className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
          <input
            id="niche"
            maxLength={60}
            className={inputClass}
            placeholder="e.g. Bakery"
            value={form.niche}
            onChange={handleChange('niche')}
          />
        </div>
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Brand Tone</label>
          <input
            id="tone"
            maxLength={60}
            className={inputClass}
            placeholder="e.g. Fun, warm, playful"
            value={form.tone}
            onChange={handleChange('tone')}
          />
        </div>
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Current Goal</label>
          <input
            id="goal"
            maxLength={100}
            className={inputClass}
            placeholder="e.g. Promote weekend sale"
            value={form.goal}
            onChange={handleChange('goal')}
          />
        </div>
        <div>
          <label htmlFor="pastPosts" className="block text-sm font-medium text-gray-700 mb-1">
            Past Post Examples <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="pastPosts"
            maxLength={2000}
            className={`${inputClass} h-24`}
            placeholder="Paste 2-3 example captions here"
            value={form.pastPostExamples}
            onChange={handleChange('pastPostExamples')}
          />
          <p className="text-xs text-gray-400 mt-1">{form.pastPostExamples.length}/2000</p>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            to="/"
            className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            Save Client
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientForm