import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Container from "../../components/ui/Container";
import ProductGrid from "../../components/product/ProductGrid";
import ProductFilters, {
  type AppliedFilters,
} from "../../components/product/ProductFilter";
import useProductFilters from "../../hooks/useProductFilter";

import { getProducts } from "../../services/api";
import type { Product as ProductType } from "../../types/Product";

function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
  } = useProductFilters(products);

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "Failed to load products");
        }

        if (!cancelled) {
          setProducts(data.products);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load products"
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("focus") !== "search") return;

    const timer = window.setTimeout(() => {
      const searchInput = document.querySelector(
        'input[type="search"]'
      ) as HTMLInputElement | null;

      searchInput?.focus();
      searchInput?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [searchParams, loading]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl || categories.length === 0) return;

    const matchingCategory = categories.find(
      (item) => item.toLowerCase() === categoryFromUrl.toLowerCase()
    );

    if (matchingCategory) {
      setCategory(matchingCategory);
    }
  }, [searchParams, categories, setCategory]);

  const handleApplyFilters = (filters: AppliedFilters) => {
    setCategory(filters.category);
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
  };

  if (loading) {
    return (
      <section className="py-4 sm:py-8 lg:py-10">
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
      <section className="py-4 sm:py-8 lg:py-10">
        <Container>
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-4 sm:py-8 lg:py-10">
      <Container>
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

        <div className="mb-6">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceLimit={20000}
            onApplyFilters={handleApplyFilters}
          />
        </div>

        <div className="mb-6 flex items-center justify-between gap-3 border-b border-neutral-100 pb-5">
          <p className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-neutral-900">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          <p className="text-right text-xs text-neutral-500">
            ₹{minPrice.toLocaleString("en-IN")} – ₹
            {maxPrice.toLocaleString("en-IN")}
          </p>
        </div>

        <ProductGrid products={filteredProducts} />
      </Container>
    </section>
  );
}

export default Product;
