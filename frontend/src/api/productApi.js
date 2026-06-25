const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error('No se pudo obtener la informacion solicitada')
  }

  return response.json()
}

export function getProducts() {
  return request('/productos')
}

export function getProductById(id) {
  return request(`/productos/${id}`)
}
