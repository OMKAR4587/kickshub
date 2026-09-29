import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import StateMessage from "../ui/StateMessage";
import useProductGridReveal from "../../hooks/useProductGridReveal";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  const gridRef = useProductGridReveal(products);

  if (products.length === 0) {
    return (
      <StateMessage
        type="empty"
        title="No sneakers found"
        message="Try changing your search, category, or price filters."
      />
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product) => (
        <div key={product.id} className="product-reveal-card">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;