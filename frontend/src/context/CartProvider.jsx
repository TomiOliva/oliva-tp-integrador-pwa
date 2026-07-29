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
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!notification) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setNotification(null)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [notification])

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

    setNotification({
      message: 'Producto agregado exitosamente',
      type: 'success',
    })
  }

  const removeProduct = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )

    setNotification({
      message: 'Producto eliminado del carrito',
      type: 'info',
    })
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

  const clearCart = () => {
    setItems([])
    setNotification({
      message: 'Carrito vaciado',
      type: 'info',
    })
  }

  const checkout = () => {
    setItems([])
    setNotification({
      message: 'Compra realizada exitosamente',
      type: 'success',
    })
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
    notification,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    checkout,
    clearNotification: () => setNotification(null),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
