import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Container from "../../components/ui/Container";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import { getProduct } from "../../services/api";
import type { Product } from "../../types/Product";
import gsap from "gsap";

function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { isWishlisted, toggleWishlist } = useWishlist();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getProduct(id)
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data.product);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product || loading) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-image", {
        opacity: 0,
        x: -40,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".product-info > p, .product-info > h1, .product-info > div", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.15,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product, loading]);

  if (loading) {
    return (
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <p className="text-sm text-neutral-500">Loading product...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              404
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Product not found
            </h1>

            <p className="mt-4 text-neutral-500">
              The sneaker you're looking for doesn't exist.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Back to sneakers
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  return (
    <section ref={pageRef} className="py-12 sm:py-16 lg:py-20">
      <Container>
        {/* Back */}
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to sneakers
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#f5f7fb]">
            {product.badge && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 shadow-sm">
                {product.badge}
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className={`absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 ${
                wishlisted ? "text-purple-600" : "text-neutral-700"
              }`}
            >
              <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
            </button>

            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="flex aspect-square items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="product-image relative z-10 h-full w-full object-contain transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Product information */}
          <div className="product-info flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-bold text-neutral-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="my-8 h-px bg-neutral-100" />

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Description
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-500">
                {product.description}
              </p>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-900">
                  Select size
                </p>

                <span className="text-xs text-neutral-400">US</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-xl border py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-md"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-neutral-900">
                Quantity
              </p>

              <div className="flex h-12 w-fit items-center rounded-xl border border-neutral-200">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className="flex h-full w-12 items-center justify-center text-neutral-500 transition hover:text-black disabled:opacity-30 hover:scale-110"
                >
                  <Minus size={16} />
                </button>

                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-full w-12 items-center justify-center text-neutral-500 transition hover:text-black hover:scale-110"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              disabled={!product.inStock || selectedSize === null}
              onClick={() => {
                if (selectedSize === null) return;

                addToCart(product, selectedSize, quantity);

                showToast(`${product.name} added to your cart`, "success");
              }}
              className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-neutral-200 disabled:text-neutral-400"
            >
              <ShoppingBag size={18} />

              {!product.inStock
                ? "Sold Out"
                : selectedSize === null
                  ? "Select a size"
                  : "Add to Cart"}
            </button>

            {/* Stock */}
            <p className="mt-4 text-center text-xs text-neutral-400">
              {product.inStock
                ? "In stock • Ready to ship"
                : "Currently unavailable"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductDetail;
