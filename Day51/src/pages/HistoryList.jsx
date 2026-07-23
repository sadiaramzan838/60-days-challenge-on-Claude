function HistoryList() {
  const dummyHistory = [
    { id: '1', label: 'Behind-the-scenes bakery post', time: '2 hours ago' },
    { id: '2', label: 'Weekend sale announcement', time: 'Yesterday' },
  ]

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">History</h3>
      <div className="space-y-2">
        {dummyHistory.map((entry) => (
          <div key={entry.id} className="flex justify-between items-center border-b pb-2 text-sm">
            <span>{entry.label}</span>
            <span className="text-gray-400">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryList