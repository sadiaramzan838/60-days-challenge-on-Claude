const CLIENTS_KEY = 'contentspark_clients'

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
    // Update existing
    const updated = clients.map((c) => (c.id === client.id ? { ...c, ...client } : c))
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(updated))
    return client
  } else {
    // Create new
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