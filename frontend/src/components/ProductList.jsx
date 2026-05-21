import { ProductCard } from './ProductCard'

export function ProductList({ products, onSelectProduct }) {
  return (
    <section className="products-section">
      <div className="section-heading">
        <h2>Productos destacados</h2>
        <p>{products.length} productos disponibles</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </section>
  )
}
