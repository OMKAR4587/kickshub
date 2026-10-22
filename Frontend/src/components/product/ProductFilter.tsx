import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import type { SortOption } from "../../hooks/useProductFilter";

export type AppliedFilters = {
  category: string;
  minPrice: number;
  maxPrice: number;
};

type ProductFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  categories: string[];
  onFilterClick?: () => void;
  minPrice?: number;
  maxPrice?: number;
  priceLimit?: number;
  onApplyFilters?: (filters: AppliedFilters) => void;
};

function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
  minPrice = 0,
  maxPrice = 20000,
  priceLimit = 20000,
  onApplyFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [draftCategory, setDraftCategory] = useState(category);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  useEffect(() => {
    if (!isOpen) {
      setDraftCategory(category);
      setDraftMinPrice(minPrice);
      setDraftMaxPrice(maxPrice);
    }
  }, [category, minPrice, maxPrice, isOpen]);

  const applyFilters = () => {
    if (draftMinPrice > draftMaxPrice) return;

    setCategory(draftCategory);

    onApplyFilters?.({
      category: draftCategory,
      minPrice: draftMinPrice,
      maxPrice: draftMaxPrice,
    });

    setIsOpen(false);
  };

  const resetFilters = () => {
    setDraftCategory("All");
    setDraftMinPrice(0);
    setDraftMaxPrice(priceLimit);
  };

  return (
    <>
      <div className="space-y-5">
        {/* Search and controls */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search sneakers..."
              aria-label="Search sneakers"
              className="w-full rounded-2xl border border-neutral-200 bg-white py-3.5 pl-11 pr-4 text-base outline-none transition placeholder:text-neutral-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 sm:text-sm"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-purple-300 hover:bg-purple-50"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            aria-label="Sort products"
            className="min-h-12 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-base font-semibold text-neutral-800 outline-none focus:border-purple-500 sm:text-sm"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Quick category buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "bg-neutral-950 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Filter drawer */}
      <aside
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby="filter-title"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[51] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-5 sm:px-7">
          <div>
            <h2
              id="filter-title"
              className="text-xl font-bold tracking-tight text-neutral-950"
            >
              Filter products
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Refine your sneaker search
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close filters"
            className="rounded-full bg-neutral-100 p-2.5 text-neutral-700 transition hover:bg-neutral-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Scrollable filter options */}
        <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6 sm:px-7">
          {/* Category */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-neutral-900">
              Category
            </h3>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => {
                const selected = draftCategory === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDraftCategory(item)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
                      selected
                        ? "border-neutral-950 bg-neutral-950 text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {selected && <Check size={14} />}
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Price range */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">
                Price range
              </h3>

              <span className="text-xs text-neutral-500">INR (₹)</span>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              <label className="space-y-2">
                <span className="text-xs text-neutral-500">Minimum</span>
                <div className="flex items-center rounded-xl border border-neutral-200 px-3">
                  <span className="text-sm text-neutral-500">₹</span>
                  <input
                    type="number"
                    min={0}
                    max={priceLimit}
                    value={draftMinPrice}
                    onChange={(event) =>
                      setDraftMinPrice(
                        Math.max(0, Number(event.target.value) || 0)
                      )
                    }
                    className="w-full min-w-0 bg-transparent px-2 py-3 text-base outline-none"
                  />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-xs text-neutral-500">Maximum</span>
                <div className="flex items-center rounded-xl border border-neutral-200 px-3">
                  <span className="text-sm text-neutral-500">₹</span>
                  <input
                    type="number"
                    min={0}
                    max={priceLimit}
                    value={draftMaxPrice}
                    onChange={(event) =>
                      setDraftMaxPrice(
                        Math.min(
                          priceLimit,
                          Math.max(0, Number(event.target.value) || 0)
                        )
                      )
                    }
                    className="w-full min-w-0 bg-transparent px-2 py-3 text-base outline-none"
                  />
                </div>
              </label>
            </div>

            <input
              type="range"
              min={0}
              max={priceLimit}
              step={500}
              value={Math.min(draftMaxPrice, priceLimit)}
              onChange={(event) =>
                setDraftMaxPrice(Number(event.target.value))
              }
              aria-label="Maximum price"
              className="w-full accent-neutral-950"
            />

            <div className="mt-2 flex justify-between text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹{priceLimit.toLocaleString("en-IN")}</span>
            </div>

            {draftMinPrice > draftMaxPrice && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                Minimum price cannot exceed maximum price.
              </p>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 bg-white p-5 sm:px-7">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={applyFilters}
              disabled={draftMinPrice > draftMaxPrice}
              className="min-h-12 flex-[1.4] rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default ProductFilters;
