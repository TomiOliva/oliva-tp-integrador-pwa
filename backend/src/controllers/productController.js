const productService = require('../services/productService')

async function getAllProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProducts,
  getProductById,
}
