export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { niche, tone, goal, pastPostExamples } = req.body || {}

  if (
    typeof niche !== 'string' || !niche.trim() ||
    typeof tone !== 'string' || !tone.trim() ||
    typeof goal !== 'string' || !goal.trim()
  ) {
    return res.status(400).json({ error: 'Missing required client information.' })
  }

  // Cap lengths to keep prompts sane and protect free-tier quota from abuse
  const safeNiche = niche.trim().slice(0, 200)
  const safeTone = tone.trim().slice(0, 200)
  const safeGoal = goal.trim().slice(0, 300)
  const safePastPosts = typeof pastPostExamples === 'string'
    ? pastPostExamples.trim().slice(0, 2000)
    : ''

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  const systemPrompt = `You are a social media content strategist. Given a client's niche, brand tone, and current goal, generate fresh content ideas.

Respond with ONLY valid JSON, no markdown, no commentary, in exactly this shape:
{
  "ideas": ["idea 1", "idea 2", "idea 3"],
  "captions": ["caption matching idea 1", "caption matching idea 2", "caption matching idea 3"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"],
  "visualDirection": "one short paragraph describing suggested visual style/direction"
}

Generate 3 to 5 ideas. Each caption must match its idea by position in the array. Do not include hashtags inside the captions themselves — hashtags belong only in the separate hashtags array.`

  const userPrompt = `Niche: ${safeNiche}
Brand tone: ${safeTone}
Current goal: ${safeGoal}
Past post examples: ${safePastPosts || '(none provided)'}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 25000)

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
        max_tokens: 1536,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!groqResponse.ok) {
      return res.status(502).json({ error: 'Something went wrong generating content. Please try again.' })
    }

    const data = await groqResponse.json()
    const rawText = data.choices?.[0]?.message?.content

    let parsed
    try {
      parsed = JSON.parse(rawText)
    } catch {
      return res.status(502).json({ error: 'Something went wrong generating content. Please try again.' })
    }

    const isValid =
      Array.isArray(parsed.ideas) && parsed.ideas.length > 0 &&
      Array.isArray(parsed.captions) &&
      Array.isArray(parsed.hashtags) &&
      typeof parsed.visualDirection === 'string' && parsed.visualDirection.trim()

    if (!isValid) {
      return res.status(502).json({ error: 'Something went wrong generating content. Please try again.' })
    }

    return res.status(200).json(parsed)
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'This is taking longer than expected. Please try again.' })
    }
    return res.status(502).json({ error: 'Something went wrong generating content. Please try again.' })
  }
}