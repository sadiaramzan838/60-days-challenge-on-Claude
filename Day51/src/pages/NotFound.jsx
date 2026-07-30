import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center py-24">
      <div className="text-4xl mb-3">🧭</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound