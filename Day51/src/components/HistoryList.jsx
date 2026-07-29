import { formatRelativeTime } from '../utils/formatTime'

function HistoryList({ entries, onSelect, onDelete }) {
  if (entries.length === 0) {
    return (
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">History</h3>
        <p className="text-sm text-gray-400">No generations yet — click Generate Content to get started.</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">History</h3>
      <div className="space-y-1">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between items-center border-b py-2.5 text-sm group"
          >
            <button
              onClick={() => onSelect(entry)}
              className="text-left flex-1 hover:text-blue-600 transition-colors truncate pr-4"
            >
              {entry.ideas?.[0] || 'Untitled generation'}
            </button>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-gray-400">{formatRelativeTime(entry.createdAt)}</span>
              <button
                onClick={() => onDelete(entry.id)}
                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Delete history entry"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryList