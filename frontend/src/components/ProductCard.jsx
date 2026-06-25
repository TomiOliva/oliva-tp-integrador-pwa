import { formatPrice } from '../utils/formatPrice'

export function ProductCard({ product, onSelectProduct }) {
  const price = formatPrice(product.price)

  return (
    <article className="product-card">
      <img className="product-card__image" src={product.image} alt={product.name} />

      <div className="product-card__body">
        <h2>{product.name}</h2>
        <p className="product-card__price">
          {product.currency} {price}
        </p>
        <button type="button" onClick={() => onSelectProduct(product.id)}>
          Ver detalle
        </button>
      </div>
    </article>
  )
}
