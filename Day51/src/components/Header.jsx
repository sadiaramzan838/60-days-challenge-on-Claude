import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-8 py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          <span className="text-blue-600">✦</span> ContentSpark
        </Link>
      </div>
    </header>
  )
}

export default Header