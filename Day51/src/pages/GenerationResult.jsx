import CopyButton from './CopyButton'

function GenerationResult({ result }) {
  if (!result) return null

  const ideas = Array.isArray(result.ideas) ? result.ideas : []
  const captions = Array.isArray(result.captions) ? result.captions : []
  const hashtags = Array.isArray(result.hashtags) ? result.hashtags : []
  const visualDirection = typeof result.visualDirection === 'string' ? result.visualDirection : ''

  if (ideas.length === 0) {
    return (
      <div className="border rounded-lg p-5 mb-4 text-gray-400 text-sm">
        No content was returned. Try generating again.
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-5 mb-4" aria-live="polite">
      <h3 className="font-semibold text-gray-900 mb-4">Result</h3>

      {ideas.map((idea, i) => (
        <div key={i} className="mb-4 pb-4 border-b last:border-b-0">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Idea {i + 1}</p>
          <div className="flex justify-between items-start gap-2 mb-3">
            <p className="font-medium text-gray-900">{idea}</p>
            <CopyButton text={idea} />
          </div>

          {captions[i] && (
            <>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Caption</p>
              <div className="flex justify-between items-start gap-2">
                <p className="text-gray-700">{captions[i]}</p>
                <CopyButton text={captions[i]} />
              </div>
            </>
          )}
        </div>
      ))}

      {hashtags.length > 0 && (
        <div className="mb-5">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Hashtags</p>
          <div className="flex flex-wrap items-center gap-2">
            {hashtags.map((tag, i) => (
              <span key={i} className="bg-blue-50 text-blue-600 text-sm px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
            <CopyButton text={hashtags.join(' ')} />
          </div>
        </div>
      )}

      {visualDirection && (
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-xs uppercase tracking-wide text-purple-500 mb-1 font-medium">
            🎨 Visual Direction
          </p>
          <div className="flex justify-between items-start gap-2">
            <p className="text-gray-700">{visualDirection}</p>
            <CopyButton text={visualDirection} />
          </div>
        </div>
      )}
    </div>
  )
}

export default GenerationResult