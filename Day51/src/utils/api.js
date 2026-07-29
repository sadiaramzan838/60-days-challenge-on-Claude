export async function generateContent(clientProfile) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      niche: clientProfile.niche,
      tone: clientProfile.tone,
      goal: clientProfile.goal,
      pastPostExamples: clientProfile.pastPostExamples,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }

  return data
}