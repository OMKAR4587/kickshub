import { Heart, ArrowUpRight } from "lucide-react"
import type { Product } from "../../types/Product"

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-3xl bg-[#f5f7fb] p-5">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white"
        >
          <Heart size={17} strokeWidth={2} />
        </button>

        <div className="flex aspect-square items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        <button
          type="button"
          className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-label={`View ${product.name}`}
        >
          <ArrowUpRight size={19} />
        </button>
      </div>

      <div className="flex items-start justify-between gap-4 px-1 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {product.category}
          </p>

          <h3 className="mt-1 text-base font-semibold text-neutral-900">
            {product.name}
          </h3>
        </div>

        <p className="text-sm font-bold text-neutral-900">
          ${product.price}
        </p>
      </div>
    </article>
  )
}

export default ProductCard