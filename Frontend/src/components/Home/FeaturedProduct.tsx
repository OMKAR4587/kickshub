import { useEffect, useState } from "react"
import Container from "../ui/Container"
import ProductCard from "../product/ProductCard"
import useScrollReveal from "../../hooks/useScrollReveal"
import { getProducts } from "../../services/api"
import type { Product } from "../../types/Product"

function FeaturedProducts() {
  const sectionRef = useScrollReveal()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "Failed to load products")
        }

        setProducts(data.products.slice(0, 4))
      })
      .catch((error) => {
        console.error("Failed to load featured products:", error)
      })
  }, [])

  return (
    <section className="py-20">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600">
            Featured
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured Sneakers
          </h2>

          <p className="mt-3 text-neutral-500">
            Discover the sneakers everyone is talking about.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
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

export default FeaturedProducts