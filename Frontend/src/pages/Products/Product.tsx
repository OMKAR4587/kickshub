
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownUp, ArrowRight, RefreshCw, Search } from "lucide-react";

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

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("newest");
    setMinPrice(0);
    setMaxPrice(20000);
  };

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-[#faf9f6] py-12 sm:py-20">
        <Container>
          <div className="mx-auto max-w-7xl animate-pulse">
            <div className="mb-5 h-4 w-20 rounded bg-neutral-200" />
            <div className="mb-4 h-10 w-64 max-w-full rounded-lg bg-neutral-200 sm:h-14 sm:w-96" />
            <div className="mb-10 h-4 w-80 max-w-full rounded bg-neutral-200" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-4/5 rounded-2xl bg-neutral-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-neutral-200" />
                  <div className="mt-3 h-4 w-1/3 rounded bg-neutral-200" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center bg-[#faf9f6] py-12">
        <Container>
          <div className="mx-auto max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <RefreshCw size={24} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
              Couldn't load the collection
            </h2>
            <p className="mt-3 wrap-break-word text-sm leading-6 text-neutral-500">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            >
              Try again <ArrowRight size={16} />
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-neutral-950">
      {/* Collection introduction */}
      <section className="relative overflow-hidden border-b border-neutral-200/70 bg-[#f1efe9]">
        <Container>
          <div className="relative grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:py-20">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/70 px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700 sm:text-xs">
                  The sneaker collection
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-8xl">
                Find your
                <br />
                <span className="text-neutral-500">next move.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                Everyday essentials. Statement silhouettes. Sneakers that
                bring comfort and personal style together.
              </p>

              <a
                href="#sneaker-collection"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
              >
                Explore collection
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="relative hidden min-w-48 pb-2 text-right lg:block">
              <div
                className="pointer-events-none absolute -right-8 -top-20 h-52 w-52 rounded-full border border-neutral-300/80"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-2 -top-14 h-40 w-40 rounded-full border border-neutral-300/80"
                aria-hidden="true"
              />
              <p className="relative text-6xl font-black tracking-[-0.08em] text-neutral-900">
                01<span className="text-neutral-400">/</span>
              </p>
              <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Built for your pace
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Collection and filters */}
      <section
        id="sneaker-collection"
        className="scroll-mt-6 py-8 sm:py-12 lg:py-14"
      >
        <Container>
          <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500 sm:text-xs">
                Curated for you
              </p>
              <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                All sneakers
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Discover your next everyday favourite.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-neutral-200 bg-white px-4 py-2.5 sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-neutral-950" />
              <span className="text-xs font-semibold text-neutral-700">
                {products.length} items in collection
              </span>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-neutral-200/80 bg-white p-3 shadow-sm sm:mb-8 sm:rounded-3xl sm:p-5">
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

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 sm:mb-7 sm:pb-5">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-bold text-neutral-950">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "result" : "results"}
            </p>

            <p className="text-right text-xs font-medium tabular-nums text-neutral-500 sm:text-sm">
              ₹{minPrice.toLocaleString("en-IN")} – ₹
              {maxPrice.toLocaleString("en-IN")}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-5 py-14 text-center sm:py-20">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <Search size={23} className="text-neutral-500" />
              </div>
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                No sneakers found
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500">
                Try another search or adjust your filters to explore more of
                the collection.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
              >
                <RefreshCw size={15} />
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-neutral-200 pt-6 text-xs leading-5 text-neutral-500 sm:mt-16 sm:flex-row sm:items-center">
            <p>Good shoes. Better moves.</p>
            <a
              href="#sneaker-collection"
              className="inline-flex items-center gap-2 font-semibold text-neutral-800 transition hover:text-neutral-500"
            >
              Back to collection <ArrowDownUp size={14} />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Product;
