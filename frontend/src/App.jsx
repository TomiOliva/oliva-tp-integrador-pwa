import { useState } from 'react'
import { Cart } from './components/Cart'
import { ProductDetail } from './components/ProductDetail'
import { ProductList } from './components/ProductList'
import { Toast } from './components/Toast'
import { useCart } from './hooks/useCart'
import { useProducts } from './hooks/useProducts'
import './App.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cart = useCart()
  const {
    products,
    categories,
    page,
    categoryId,
    sortValue,
    totalProducts,
    totalPages,
    pageNumbers,
    hasPreviousPage,
    hasNextPage,
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
    clearFilters,
  } = useProducts()

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">E-commerce</p>
          <h1>Tienda Online - PWA - Tomas Oliva</h1>
          <p className="intro">TP PWA - Entrega final</p>
        </div>

        <button
          className="cart-open-button"
          type="button"
          onClick={() => setIsCartOpen(true)}
        >
          <span className="cart-open-button__icon" aria-hidden="true">🛒</span>
          Carrito
          {cart.itemCount > 0 && (
            <span className="cart-open-button__badge">{cart.itemCount}</span>
          )}
        </button>
      </header>

      {error && <p className="status-message status-message--error">{error}</p>}

      {isCartOpen && (
        <div className="cart-modal">
          <button
            className="cart-backdrop"
            type="button"
            aria-label="Cerrar carrito"
            onClick={() => setIsCartOpen(false)}
          />
          <aside className="cart-drawer" aria-label="Carrito de compras">
            <Cart cart={cart} onClose={() => setIsCartOpen(false)} />
          </aside>
        </div>
      )}

      <Toast
        notification={cart.notification}
        onClose={cart.clearNotification}
      />

      {loadingProducts ? (
        <p className="status-message">Cargando productos...</p>
      ) : selectedProductId && loadingDetail ? (
        <p className="status-message">Cargando producto...</p>
      ) : selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={showList}
          onAddToCart={cart.addProduct}
        />
      ) : (
        <ProductList
          products={products}
          categories={categories}
          page={page}
          categoryId={categoryId}
          sortValue={sortValue}
          totalProducts={totalProducts}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onSelectProduct={selectProduct}
          onAddToCart={cart.addProduct}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          onGoToPage={goToPage}
          onChangeCategory={changeCategory}
          onChangeSort={changeSort}
          onClearFilters={clearFilters}
        />
      )}
    </main>
  )
}

export default App
