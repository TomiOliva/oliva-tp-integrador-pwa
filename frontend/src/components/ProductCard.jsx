import { formatPrice } from '../utils/formatPrice'
import { handleImageError } from '../utils/imageFallback'

export function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const price = formatPrice(product.price)

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.image}
        alt={product.name}
        onError={handleImageError}
      />

      <div className="product-card__body">
        <h2>{product.name}</h2>
        <p className="product-card__price">
          {product.currency} {price}
        </p>
        <div className="product-card__actions">
          <button type="button" onClick={() => onSelectProduct(product.id)}>
            Ver detalle
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}
