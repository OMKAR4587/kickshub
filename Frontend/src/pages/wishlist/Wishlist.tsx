import { useEffect, useState } from "react"
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowUpRight,
} from "lucide-react"
import { Link } from "react-router-dom"

import Container from "../../components/ui/Container"
import { useWishlist } from "../../context/WishlistContext"
import { useCart } from "../../context/CartContext"
import { useToast } from "../../context/ToastContext"
import { getProducts } from "../../services/api"
import type { Product } from "../../types/Product"

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data.success) {
          throw new Error(
            data.message || "Failed to load products",
          )
        }

        setProducts(data.products)
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load products",
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  )

  const handleRemove = (
    productId: string,
    productName: string,
  ) => {
    toggleWishlist(productId)

    showToast(
      `${productName} removed from wishlist`,
      "info",
    )
  }

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      showToast(
        "This product is currently out of stock",
        "warning",
      )
      return
    }

    const defaultSize = product.sizes[0]

    addToCart(product, defaultSize, 1)

    showToast(
      `${product.name} added to your cart`,
      "success",
    )
  }

  if (loading) {
    return (
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-10">
        <Container>
          <div className="flex min-h-[360px] items-center justify-center">
            <p className="text-neutral-500">
              Loading wishlist...
            </p>
          </div>
        </Container>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-10">
        <Container>
          <div className="flex min-h-[360px] items-center justify-center">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-10">
      <Container>

        {/* Header */}
        <div className="relative mb-12 flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
                Your collection
              </span>
            </div>

            <h1 className="text-5xl font-black leading-none tracking-[-0.05em] text-neutral-950 sm:text-6xl lg:text-7xl">
              Wishlist
              <span className="text-purple-600">
                .
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
              The pairs you've got your eye on.
              Keep them close until you're ready.
            </p>
          </div>

          {/* Count */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white">
              <Heart
                size={18}
                fill="currentColor"
              />
            </div>

            <div>
              <p className="text-2xl font-black tracking-tight text-neutral-950">
                {wishlistProducts.length}
              </p>

              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Saved
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 && (
          <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-50 px-6 text-center">

            {/* Decorative circles */}
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full border border-neutral-200" />

            <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full border border-purple-200" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Heart
                size={26}
                className="text-neutral-400"
              />
            </div>

            <h2 className="relative mt-6 text-2xl font-black tracking-tight text-neutral-950">
              Nothing saved yet.
            </h2>

            <p className="relative mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Discover a pair that feels right and
              save it here for later.
            </p>

            <Link
              to="/products"
              className="group relative mt-7 inline-flex items-center gap-3 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-600"
            >
              Explore Sneakers

              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        )}

        {/* Products */}
        {wishlistProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

            {wishlistProducts.map((product) => (
              <article
                key={product.id}
                className="group"
              >

                {/* Product image */}
                <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.75rem] bg-neutral-100">

                  <Link
                    to={`/products/${product.id}`}
                    className="block h-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  </Link>

                  {/* Gradient overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Product badge */}
                  {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-900 shadow-sm backdrop-blur">
                      {product.badge}
                    </span>
                  )}

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(
                        product.id,
                        product.name,
                      )
                    }
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-700 shadow-sm backdrop-blur transition hover:bg-neutral-950 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Quick add */}
                  {product.inStock && (
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-white/95 py-3.5 text-sm font-semibold text-neutral-950 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-purple-600 hover:text-white"
                    >
                      <ShoppingBag size={16} />
                      Quick add
                    </button>
                  )}
                </div>

                {/* Product info */}
                <div className="mt-5">

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">
                      <Link
                        to={`/products/${product.id}`}
                        className="block"
                      >
                        <h2 className="truncate text-lg font-bold tracking-tight text-neutral-950 transition hover:text-purple-600">
                          {product.name}
                        </h2>
                      </Link>

                      <p className="mt-1 text-sm text-neutral-500">
                        {product.category}
                      </p>
                    </div>

                    {/* INR */}
                    <p className="shrink-0 whitespace-nowrap text-sm font-bold text-neutral-950">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Bottom action */}
                  <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">

                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        product.inStock
                          ? "text-green-600"
                          : "text-neutral-400"
                      }`}
                    >
                      {product.inStock
                        ? "In stock"
                        : "Out of stock"}
                    </span>

                    <Link
                      to={`/products/${product.id}`}
                      className="group/link flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 transition hover:text-purple-600"
                    >
                      View

                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </Container>
    </section>
  )
}

export default Wishlist