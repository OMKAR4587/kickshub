import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import type { Product } from "../types/Product"

export type CartItem = {
  product: Product
  size: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (
    product: Product,
    size: number,
    quantity: number,
  ) => void
  removeFromCart: (productId: string, size: number) => void
  updateQuantity: (
    productId: string,
    size: number,
    quantity: number,
  ) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("kickshub-cart")

    if (!savedCart) {
      return []
    }

    try {
      return JSON.parse(savedCart)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("kickshub-cart", JSON.stringify(items))
  }, [items])

  const addToCart = (
    product: Product,
    size: number,
    quantity: number,
  ) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id &&
          item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          product,
          size,
          quantity,
        },
      ]
    })
  }

  const removeFromCart = (
    productId: string,
    size: number,
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size
          ),
      ),
    )
  }

  const updateQuantity = (
    productId: string,
    size: number,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId &&
        item.size === size
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  )

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0,
      ),
    [items],
  )

  const value = {
    items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    )
  }

  return context
}