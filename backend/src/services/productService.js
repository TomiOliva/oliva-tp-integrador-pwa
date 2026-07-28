const productRepository = require('../repositories/productRepository')

const DEFAULT_LIMIT = 24
const MAX_LIMIT = 100
const VALID_SORT_OPTIONS = ['name', 'price']
const VALID_SORT_DIRECTIONS = ['asc', 'desc']

function parseProductId(id) {
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId <= 0) {
    const error = new Error('El ID del producto debe ser un entero positivo')
    error.statusCode = 400
    throw error
  }

  return productId
}

function parseInteger(value, fieldName, minValue) {
  if (value === undefined) {
    return null
  }

  const parsedValue = Number(value)

  if (!Number.isInteger(parsedValue) || parsedValue < minValue) {
    const error = new Error(`${fieldName} debe ser un numero entero valido`)
    error.statusCode = 400
    throw error
  }

  return parsedValue
}

function getPagination(query) {
  const parsedLimit = parseInteger(query.limit, 'limit', 1)
  const parsedOffset = parseInteger(query.offset, 'offset', 0)
  const limit = parsedLimit === null ? DEFAULT_LIMIT : parsedLimit
  const offset = parsedOffset === null ? 0 : parsedOffset

  return {
    limit: Math.min(limit, MAX_LIMIT),
    offset,
  }
}

function getFilters(query) {
  const categoryId = parseInteger(query.categoryId, 'categoryId', 1)

  return {
    categoryId,
  }
}

function getSorting(query) {
  const sortBy = query.sortBy || 'id'
  const sortDirection = query.sortDirection || 'asc'

  if (sortBy !== 'id' && !VALID_SORT_OPTIONS.includes(sortBy)) {
    const error = new Error('sortBy debe ser name o price')
    error.statusCode = 400
    throw error
  }

  if (!VALID_SORT_DIRECTIONS.includes(sortDirection)) {
    const error = new Error('sortDirection debe ser asc o desc')
    error.statusCode = 400
    throw error
  }

  return {
    sortBy,
    sortDirection,
  }
}

async function getAllProducts(query = {}) {
  const pagination = getPagination(query)
  const filters = getFilters(query)
  const sorting = getSorting(query)
  const options = {
    ...pagination,
    ...filters,
    ...sorting,
  }
  const [products, total] = await Promise.all([
    productRepository.findAll(options),
    productRepository.countAll(filters),
  ])

  return {
    products,
    pagination: {
      ...pagination,
      total,
      page: Math.floor(pagination.offset / pagination.limit) + 1,
      totalPages: Math.ceil(total / pagination.limit),
    },
  }
}

async function getProductById(id) {
  const productId = parseProductId(id)

  return productRepository.findById(productId)
}

module.exports = {
  getAllProducts,
  getProductById,
}
