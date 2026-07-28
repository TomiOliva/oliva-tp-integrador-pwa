import { formatPrice } from '../utils/formatPrice'
import { handleImageError } from '../utils/imageFallback'

export function ProductDetail({ product, onBack, onAddToCart }) {
  const price = formatPrice(product.price)

  return (
    <section className="product-detail">
      <button className="back-button" type="button" onClick={onBack}>
        Volver al listado
      </button>

      <div className="product-detail__content">
        <img
          className="product-detail__image"
          src={product.image}
          alt={product.name}
          onError={handleImageError}
        />

        <div className="product-detail__info">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__price">
            {product.currency} {price}
          </p>
          <button
            className="detail-cart-button"
            type="button"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  )
}
