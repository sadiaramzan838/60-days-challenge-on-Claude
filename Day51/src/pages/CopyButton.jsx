import { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-blue-600 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default CopyButton
