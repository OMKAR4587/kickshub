import { ArrowRight } from "lucide-react"
import Container from "../ui/Container"
import ProductCard from "../product/ProductCard"
import { products } from "../../data/Product"

function NewArrivals() {
  const newProducts = products.slice(0, 3)

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Just In
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-xl text-neutral-500">
              The latest silhouettes have landed. Fresh styles, ready to move.
            </p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-purple-600 sm:flex"
          >
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default NewArrivals