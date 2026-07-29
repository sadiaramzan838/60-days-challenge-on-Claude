const CLIENTS_KEY = 'contentspark_clients'
const HISTORY_KEY = 'contentspark_history'

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

  if (client.id) {
    const updated = clients.map((c) => (c.id === client.id ? { ...c, ...client } : c))
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(updated))
    return client
  } else {
    const newClient = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...clients, newClient]
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(updated))
    return newClient
  }
}

export function deleteClient(id) {
  const clients = getClients()
  const updated = clients.filter((c) => c.id !== id)
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(updated))
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
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  return newEntry
}

export function deleteHistoryEntry(id) {
  const all = getAllHistory()
  const updated = all.filter((entry) => entry.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}