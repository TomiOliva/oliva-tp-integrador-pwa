import { useEffect, useState } from 'react'
import { getCategories, getProductById, getProducts } from '../api/productApi'

const PRODUCTS_LIMIT = 12

export function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [categoryId, setCategoryId] = useState('')
  const [sortValue, setSortValue] = useState('id-asc')
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  })
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesFromApi = await getCategories()
        setCategories(categoriesFromApi)
      } catch (apiError) {
        setError(apiError.message)
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    async function loadProducts() {
      const [sortBy, sortDirection] = sortValue.split('-')

      try {
        setError('')
        setLoadingProducts(true)
        const result = await getProducts({
          limit: PRODUCTS_LIMIT,
          offset: (page - 1) * PRODUCTS_LIMIT,
          categoryId,
          sortBy,
          sortDirection,
        })
        setProducts(result.products)
        setPagination(result.pagination)
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setLoadingProducts(false)
      }
    }

    loadProducts()
  }, [categoryId, page, sortValue])

  useEffect(() => {
    if (!selectedProductId) {
      return
    }

    async function loadProductDetail() {
      try {
        setLoadingDetail(true)
        const productFromApi = await getProductById(selectedProductId)
        setSelectedProduct(productFromApi)
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setLoadingDetail(false)
      }
    }

    loadProductDetail()
  }, [selectedProductId])

  const selectProduct = (productId) => {
    setError('')
    setSelectedProduct(null)
    setSelectedProductId(productId)
  }

  const showList = () => {
    setError('')
    setSelectedProduct(null)
    setSelectedProductId(null)
  }

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  const goToNextPage = () => {
    if (page >= pagination.totalPages) {
      return
    }

    setPage((currentPage) => currentPage + 1)
  }

  const goToPage = (pageNumber) => {
    setPage(pageNumber)
  }

  const changeCategory = (nextCategoryId) => {
    setCategoryId(nextCategoryId)
    setPage(1)
  }

  const changeSort = (nextSortValue) => {
    setSortValue(nextSortValue)
    setPage(1)
  }

  const pageRangeStart = Math.max(
    Math.min(page - 2, pagination.totalPages - 5),
    1,
  )
  const visiblePages = Math.min(pagination.totalPages, 6)
  const pageNumbers = Array.from(
    { length: visiblePages },
    (_, index) => pageRangeStart + index,
  )

  return {
    products,
    categories,
    page,
    categoryId,
    sortValue,
    totalProducts: pagination.total,
    totalPages: pagination.totalPages,
    pageNumbers,
    hasPreviousPage: page > 1,
    hasNextPage: page < pagination.totalPages,
    selectedProductId,
    selectedProduct,
    loadingProducts,
    loadingDetail,
    error,
    selectProduct,
    showList,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    changeCategory,
    changeSort,
  }
}
