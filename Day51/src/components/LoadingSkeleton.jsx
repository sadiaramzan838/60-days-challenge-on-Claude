function LoadingSkeleton() {
  return (
    <div className="border rounded-lg p-5 mb-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-4">
          <div className="h-3 bg-gray-100 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-100 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton