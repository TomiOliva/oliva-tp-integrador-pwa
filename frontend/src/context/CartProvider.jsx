import { useEffect, useState } from 'react'
import { CartContext } from './cartContext'

const CART_STORAGE_KEY = 'tp-pwa-cart'

function getInitialCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY)

  if (!storedCart) {
    return []
  }

  try {
    return JSON.parse(storedCart)
  } catch {
    return []
  }
}

function getCartProduct(product) {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    currency: product.currency,
    image: product.image,
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addProduct = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          product: getCartProduct(product),
          quantity: 1,
        },
      ]
    })
  }

  const removeProduct = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeProduct(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce(
    (amount, item) => amount + item.product.price * item.quantity,
    0,
  )
  const currency = items[0]?.product.currency || 'USD'

  const value = {
    items,
    itemCount,
    total,
    currency,
    addProduct,
    removeProduct,
    updateQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
