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
      className={`text-sm border rounded px-2 py-1 shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
        copied
          ? 'text-green-600 border-green-200 bg-green-50'
          : 'text-blue-600 border-blue-200 hover:bg-blue-50'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

export default CopyButton