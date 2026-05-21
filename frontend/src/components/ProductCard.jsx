export function ProductCard({ product, onSelectProduct }) {
  const price = product.price.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <article className="product-card">
      <img className="product-card__image" src={product.image} alt={product.name} />

      <div className="product-card__body">
        <h2>{product.name}</h2>
        <p className="product-card__price">
          {product.currency} {price}
        </p>
        <button type="button" onClick={() => onSelectProduct(product)}>
          Ver detalle
        </button>
      </div>
    </article>
  )
}
