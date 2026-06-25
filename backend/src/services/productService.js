const productRepository = require('../repositories/productRepository')

function parseProductId(id) {
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId <= 0) {
    return null
  }

  return productId
}

async function getAllProducts() {
  return productRepository.findAll()
}

async function getProductById(id) {
  const productId = parseProductId(id)

  if (!productId) {
    return null
  }

  return productRepository.findById(productId)
}

module.exports = {
  getAllProducts,
  getProductById,
}
