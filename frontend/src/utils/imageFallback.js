const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23eef2f7%22/%3E%3Ctext x=%22200%22 y=%22152%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%2364758b%22%3EImagen no disponible%3C/text%3E%3C/svg%3E'

export function handleImageError(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackImage
}
