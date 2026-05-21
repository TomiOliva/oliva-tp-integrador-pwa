import { useState } from 'react'
import { ProductDetail } from './components/ProductDetail'
import { ProductList } from './components/ProductList'
import { products } from './data/products'
import './App.css'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const showList = () => setSelectedProduct(null)

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">E-commerce</p>
        <h1>Tienda Online- PWA - Tomás Oliva</h1>
        <p className="intro">
          TP PWA - Entrega n°1
        </p>
      </header>

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={showList} />
      ) : (
        <ProductList products={products} onSelectProduct={setSelectedProduct} />
      )}
    </main>
  )
}

export default App
