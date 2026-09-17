import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type WishlistContextType = {
  wishlist: string[]
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (productId: string) => void
}

const WishlistContext =
  createContext<WishlistContextType | undefined>(
    undefined,
  )

type WishlistProviderProps = {
  children: ReactNode
}

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const savedWishlist =
      localStorage.getItem("kickshub-wishlist")

    if (!savedWishlist) {
      return []
    }

    try {
      return JSON.parse(savedWishlist)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      "kickshub-wishlist",
      JSON.stringify(wishlist),
    )
  }, [wishlist])

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((currentWishlist) => {
      if (currentWishlist.includes(productId)) {
        return currentWishlist.filter(
          (id) => id !== productId,
        )
      }

      return [...currentWishlist, productId]
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider",
    )
  }

  return context
}