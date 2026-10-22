
import { useMemo, useState } from "react";
import type { Product } from "../types/Product";

export type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high";

function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(products.map((product) => product.category))),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.category === category;

      const price = Number(product.price);

      const matchesPrice =
        Number.isFinite(price) &&
        price >= minPrice &&
        price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return Number(b.isNew) - Number(a.isNew);
        default:
          return 0;
      }
    });
  }, [products, search, category, sort, minPrice, maxPrice]);

  return {
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
  };
}

export default useProductFilters;
