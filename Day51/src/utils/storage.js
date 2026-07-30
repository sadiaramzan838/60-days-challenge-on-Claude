const CLIENTS_KEY = 'contentspark_clients'
const HISTORY_KEY = 'contentspark_history'

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    throw new Error('Could not save — your browser storage may be full.')
  }
}

export function getClients() {
  const raw = localStorage.getItem(CLIENTS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function getClientById(id) {
  const clients = getClients()
  return clients.find((c) => c.id === id) || null
}

export function saveClient(client) {
  const clients = getClients()
  const trimmed = {
    ...client,
    name: (client.name || '').trim(),
    niche: (client.niche || '').trim(),
    tone: (client.tone || '').trim(),
    goal: (client.goal || '').trim(),
    pastPostExamples: (client.pastPostExamples || '').trim(),
  }

  if (trimmed.id) {
    const updated = clients.map((c) => (c.id === trimmed.id ? { ...c, ...trimmed } : c))
    safeSetItem(CLIENTS_KEY, JSON.stringify(updated))
    return trimmed
  } else {
    const newClient = {
      ...trimmed,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...clients, newClient]
    safeSetItem(CLIENTS_KEY, JSON.stringify(updated))
    return newClient
  }
}

export function deleteClient(id) {
  const clients = getClients()
  const updated = clients.filter((c) => c.id !== id)
  safeSetItem(CLIENTS_KEY, JSON.stringify(updated))
}

function getAllHistory() {
  const raw = localStorage.getItem(HISTORY_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function getHistory(clientId) {
  const all = getAllHistory()
  return all
    .filter((entry) => entry.clientId === clientId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function saveHistoryEntry(entry) {
  const all = getAllHistory()
  const newEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const updated = [...all, newEntry]
  safeSetItem(HISTORY_KEY, JSON.stringify(updated))
  return newEntry
}

export function deleteHistoryEntry(id) {
  const all = getAllHistory()
  const updated = all.filter((entry) => entry.id !== id)
  safeSetItem(HISTORY_KEY, JSON.stringify(updated))
}