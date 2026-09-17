import { Search, SlidersHorizontal } from "lucide-react";
import type { SortOption } from "../../hooks/useProductFilter";

type ProductFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  categories: string[];
  onFilterClick: () => void;
};

function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
  onFilterClick,
}: ProductFiltersProps) {
  return (
    <div className="space-y-5">
      {/* Search + actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search sneakers..."
            className="w-full rounded-2xl border border-neutral-200 bg-white py-3.5 pl-11 pr-5 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
          />
        </div>

        {/* Filter */}
        <button
          type="button"
          onClick={onFilterClick}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          <SlidersHorizontal size={17} />
          Filter
        </button>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-800 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              category === item
                ? "bg-black text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilters;
