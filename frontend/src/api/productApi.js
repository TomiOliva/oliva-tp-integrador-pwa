const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(endpoint) {
  let response

  try {
    response = await fetch(`${API_URL}${endpoint}`)
  } catch {
    throw new Error('No se pudo conectar con el backend. Verifica que la API este iniciada.')
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const apiMessage = errorData.message

    if (response.status === 400) {
      throw new Error(apiMessage || 'La solicitud enviada no es valida.')
    }

    if (response.status === 404) {
      throw new Error(apiMessage || 'No se encontro la informacion solicitada.')
    }

    if (response.status >= 500) {
      throw new Error('La API tuvo un error interno. Intenta nuevamente mas tarde.')
    }

    throw new Error(apiMessage || 'No se pudo obtener la informacion solicitada.')
  }

  return response.json()
}

export function getProducts({
  limit = 24,
  offset = 0,
  categoryId = '',
  sortBy = 'id',
  sortDirection = 'asc',
} = {}) {
  const params = new URLSearchParams({
    limit,
    offset,
    sortBy,
    sortDirection,
  })

  if (categoryId) {
    params.set('categoryId', categoryId)
  }

  return request(`/productos?${params.toString()}`)
}

export function getProductById(id) {
  return request(`/productos/${id}`)
}

export function getCategories() {
  return request('/categorias')
}
