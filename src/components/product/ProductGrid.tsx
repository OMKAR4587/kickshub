import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import StateMessage from "../ui/StateMessage";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
