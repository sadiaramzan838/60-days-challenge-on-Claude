import CopyButton from './CopyButton'

function GenerationResult({ result }) {
  if (!result) return null

  const { ideas, captions, hashtags, visualDirection } = result

  return (
    <div className="border rounded-lg p-5 mb-8">
      <h3 className="font-semibold text-gray-900 mb-3">Result</h3>

      {ideas.map((idea, i) => (
        <div key={i} className="mb-4 pb-4 border-b last:border-b-0">
          <p className="text-sm text-gray-500">Idea {i + 1}</p>
          <div className="flex justify-between items-start gap-2 mb-2">
            <p>{idea}</p>
            <CopyButton text={idea} />
          </div>

          {captions[i] && (
            <>
              <p className="text-sm text-gray-500">Caption</p>
              <div className="flex justify-between items-start gap-2">
                <p>{captions[i]}</p>
                <CopyButton text={captions[i]} />
              </div>
            </>
          )}
        </div>
      ))}

      <div className="mb-3">
        <p className="text-sm text-gray-500">Hashtags</p>
        <div className="flex justify-between items-start gap-2">
          <p className="text-blue-600">{hashtags.join(' ')}</p>
          <CopyButton text={hashtags.join(' ')} />
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Visual Direction</p>
        <div className="flex justify-between items-start gap-2">
          <p>{visualDirection}</p>
          <CopyButton text={visualDirection} />
        </div>
      </div>
    </div>
  )
}

export default GenerationResult