const categoryService = require('../services/categoryService')

async function getAllCategories(req, res, next) {
  try {
    const categories = await categoryService.getAllCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCategories,
}
