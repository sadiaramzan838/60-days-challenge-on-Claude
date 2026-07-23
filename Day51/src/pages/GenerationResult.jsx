import CopyButton from './CopyButton'

function GenerationResult() {
  const dummyIdea = "Behind-the-scenes: a day in the life of our bakery ovens"
  const dummyCaption = "Ever wondered what happens before sunrise at Bloom Bakery? ☀️🥐"
  const dummyHashtags = "#bakerylife #freshbaked #smallbusiness"
  const dummyVisual = "Warm, golden-hour lighting; close-up shots of dough and steam"

  return (
    <div className="border rounded-lg p-5 mb-8">
      <h3 className="font-semibold text-gray-900 mb-3">Result (sample)</h3>

      <div className="mb-3">
        <p className="text-sm text-gray-500">Idea</p>
        <div className="flex justify-between items-start gap-2">
          <p>{dummyIdea}</p>
          <CopyButton text={dummyIdea} />
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-500">Caption</p>
        <div className="flex justify-between items-start gap-2">
          <p>{dummyCaption}</p>
          <CopyButton text={dummyCaption} />
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-500">Hashtags</p>
        <div className="flex justify-between items-start gap-2">
          <p className="text-blue-600">{dummyHashtags}</p>
          <CopyButton text={dummyHashtags} />
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Visual Direction</p>
        <div className="flex justify-between items-start gap-2">
          <p>{dummyVisual}</p>
          <CopyButton text={dummyVisual} />
        </div>
      </div>
    </div>
  )
}

export default GenerationResult