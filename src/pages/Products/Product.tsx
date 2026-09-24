import { useEffect, useState } from "react";

import Container from "../../components/ui/Container";
import ProductGrid from "../../components/product/ProductGrid";
import ProductFilters from "../../components/product/ProductFilter";
import useProductFilters from "../../hooks/useProductFilter";
import ProductFilterPanel from "../../components/product/ProductFilterPanel";
import { getProducts } from "../../services/api";
import type { Product as ProductType } from "../../types/Product";

function Product() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "Failed to load products");
        }
        console.log(data)
        setProducts(data.products);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    maxPrice,
    setMaxPrice,
    setSort,
    categories,
    filteredProducts,
  } = useProductFilters(products);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-10">
        <Container>
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-neutral-500">Loading products...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 lg:py-10">
        <Container>
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="py-16 sm:py-20 lg:py-10">
      <Container>
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
            Shop
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            All Sneakers
          </h1>

          <p className="mt-4 text-base leading-7 text-neutral-500">
            Explore the latest sneakers built for movement, streetwear, and
            everyday style.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            categories={categories}
            onFilterClick={() => setIsFilterOpen((previous) => !previous)}
          />
        </div>

        <ProductFilterPanel
          isOpen={isFilterOpen}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Result count */}
        <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-5">
          <p className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-neutral-900">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Products */}
        <ProductGrid products={filteredProducts} />
      </Container>
    </section>
  );
}

export default Product;
