import ProductCard from "./ProductCard"
import type { Product } from "../../types/Product"

type ProductGridProps = {
  products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-3xl bg-[#f8fafc]">
        <p className="text-sm text-neutral-500">
          No products found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

export default ProductGrid