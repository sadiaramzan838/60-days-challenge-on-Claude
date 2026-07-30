export async function generateContent(clientProfile) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 28000)

  let response
  try {
    response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        niche: clientProfile.niche,
        tone: clientProfile.tone,
        goal: clientProfile.goal,
        pastPostExamples: clientProfile.pastPostExamples,
      }),
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new Error('This is taking longer than expected. Please try again.')
    }
    throw new Error("Couldn't reach the server. Check your internet connection and try again.")
  }

  clearTimeout(timeoutId)

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('Something went wrong. Please try again.')
  }

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }

  return data
}