import { Link } from 'react-router-dom'

function ClientForm() {
  return (
    <div className="max-w-xl mx-auto p-8">
      <Link to="/" className="text-blue-600 text-sm">&larr; Back</Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">New Client</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Bloom Bakery" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Bakery" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand Tone</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Fun, warm, playful" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Goal</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Promote weekend sale" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Past Post Examples</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 h-24"
            placeholder="Paste 2-3 example captions here"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Link to="/" className="border px-4 py-2 rounded-lg">Cancel</Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            Save Client
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientForm