import { formatPrice } from '../utils/formatPrice'
import { handleImageError } from '../utils/imageFallback'

export function Cart({ cart }) {
  return (
    <section className="cart">
      <div className="cart__header">
        <div>
          <h2>Carrito</h2>
          <p>{cart.itemCount} productos agregados</p>
        </div>
        <strong>
          Total: {cart.currency} {formatPrice(cart.total)}
        </strong>
      </div>

      {cart.items.length === 0 ? (
        <p className="cart__empty">Todavia no agregaste productos.</p>
      ) : (
        <div className="cart__items">
          {cart.items.map((item) => (
            <article className="cart-item" key={item.product.id}>
              <img
                src={item.product.image}
                alt={item.product.name}
                onError={handleImageError}
              />

              <div className="cart-item__info">
                <h3>{item.product.name}</h3>
                <p>
                  {item.product.currency} {formatPrice(item.product.price)}
                </p>
              </div>

              <div className="cart-item__quantity">
                <button
                  type="button"
                  onClick={() =>
                    cart.updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    cart.updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="cart-item__remove"
                type="button"
                onClick={() => cart.removeProduct(item.product.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
