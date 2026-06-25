import { useEffect, useState } from 'react'
import { getProductById, getProducts } from './api/productApi'
import { ProductDetail } from './components/ProductDetail'
import { ProductList } from './components/ProductList'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsFromApi = await getProducts()
        setProducts(productsFromApi)
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setLoadingProducts(false)
      }
    }

    loadProducts()
  }, [])

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
    setSelectedProduct(null)
    setSelectedProductId(null)
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">E-commerce</p>
        <h1>Tienda Online - PWA - Tomas Oliva</h1>
        <p className="intro">TP PWA - Entrega nro. 2</p>
      </header>

      {error && <p className="status-message status-message--error">{error}</p>}

      {loadingProducts ? (
        <p className="status-message">Cargando productos...</p>
      ) : selectedProductId && loadingDetail ? (
        <p className="status-message">Cargando producto...</p>
      ) : selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={showList} />
      ) : (
        <ProductList products={products} onSelectProduct={selectProduct} />
      )}
    </main>
  )
}

export default App
