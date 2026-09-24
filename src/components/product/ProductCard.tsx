import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../types/Product";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const wishlisted = isWishlisted(product.id);
  return (
    <article className="group">
      {/* Image area */}
      <div className="relative overflow-hidden rounded-3xl bg-[#f5f7fb]">
        {/* Badge */}
        {product.badge && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Stock status */}
        {!product.inStock && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white">
            Sold Out
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110 ${
            wishlisted
              ? "text-purple-600"
              : "text-neutral-700 hover:text-purple-600"
          }`}
        >
          <Heart
            size={17}
            strokeWidth={2}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Product link */}
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <div className="relative flex aspect-square items-center justify-center overflow-hidden">
            {/* Glow */}
            <div className="absolute h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-purple-500/15" />

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className={`relative z-10 w-full object-contain transition-all duration-700 ease-out scale-90 group-hover:scale-100 group-hover:-rotate-2 ${
                !product.inStock ? "opacity-50 grayscale" : ""
              }`}
            />

            {/* View button */}
            <span className="absolute bottom-5 right-5 z-20 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:rotate-6"
              />
            </span>
          </div>
        </Link>
      </div>

      {/* Product information */}
      <div className="flex items-start justify-between gap-4 px-1 pt-4">
        <Link to={`/products/${product.id}`} className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {product.category}
          </p>

          <h3 className="mt-1 truncate text-base font-semibold text-neutral-900 transition-colors duration-200 group-hover:text-purple-600">
            {product.name}
          </h3>

          {!product.inStock && (
            <p className="mt-1 text-xs font-medium text-red-500">
              Currently unavailable
            </p>
          )}
        </Link>

        <p className="shrink-0 text-sm font-bold text-neutral-900">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
