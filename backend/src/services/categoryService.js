const categoryRepository = require('../repositories/categoryRepository')

async function getAllCategories() {
  return categoryRepository.findAll()
}

module.exports = {
  getAllCategories,
}
