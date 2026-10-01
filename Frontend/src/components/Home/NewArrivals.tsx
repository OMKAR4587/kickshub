import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Container from "../ui/Container"
import ProductCard from "../product/ProductCard"
import useScrollReveal from "../../hooks/useScrollReveal"
import { getProducts } from "../../services/api"
import type { Product } from "../../types/Product"

function NewArrivals() {
  const sectionRef = useScrollReveal()
  const [newProducts, setNewProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "Failed to load products")
        }

        const arrivals = data.products
          .filter((product: Product) => product.isNew)
          .slice(0, 3)

        setNewProducts(arrivals)
      })
      .catch((error) => {
        console.error("Failed to load new arrivals:", error)
      })
  }, [])

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

          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-purple-600 sm:flex"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
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