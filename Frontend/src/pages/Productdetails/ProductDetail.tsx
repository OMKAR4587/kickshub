import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import Container from "../../components/ui/Container";
import { getProduct } from "../../services/api";
import type { Product } from "../../types/Product";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  const pageRef = useRef<HTMLDivElement | null>(null);

  const wishlisted = product ? isWishlisted(product.id) : false;

  // Fetch product
  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      if (!id) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setProduct(null);
      setSelectedSize(null);
      setQuantity(1);
      setImageError(false);

      try {
        const data = await getProduct(id);

        if (!cancelled) {
          setProduct(data.success ? data.product : null);
        }
      } catch (error) {
        console.error("Failed to load product:", error);

        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // GSAP animations
  useEffect(() => {
    if (!product || loading || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-image", {
        opacity: 0,
        y: 12,
        duration: 0.65,
        ease: "power3.out",
      });

      gsap.from(".product-info > *", {
        y: 16,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.08,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product, loading]);

  // Wishlist uses the product ID
  const handleWishlist = async () => {
    if (!product) return;

    try {
      await toggleWishlist(product.id);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      showToast("Could not update wishlist", "error");
    }
  };
  console.log(product)
   console.log(selectedSize)
  // Add to cart
  const handleAddToCart = () => {
    if (!product || !product.inStock) return;

    if (selectedSize === null) {
      showToast("Please select a size first", "error");
      return;
    }

    addToCart(product, selectedSize, quantity);
    showToast(`${product.name} added to your cart`, "success");
  };

  // Loading state
  if (loading) {
    return (
      <section className="min-h-[70vh] bg-white py-10 sm:py-16">
        <Container>
          <div className="grid animate-pulse gap-10 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-neutral-100" />

            <div className="flex flex-col justify-center gap-5 py-6">
              <div className="h-3 w-24 rounded bg-neutral-200" />
              <div className="h-10 w-3/4 rounded bg-neutral-200" />
              <div className="h-7 w-32 rounded bg-neutral-200" />
              <div className="mt-4 h-20 rounded bg-neutral-100" />
              <div className="mt-4 h-12 rounded bg-neutral-200" />
              <div className="h-14 rounded bg-neutral-200" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Product not found
  if (!product) {
    return (
      <section className="flex min-h-[65vh] items-center bg-white py-16">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-500">
              Error 404
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Sneaker not found
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              This product may have been removed or the link may be incorrect.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-600"
            >
              <ArrowLeft size={16} />
              Back to collection
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <main ref={pageRef} className="bg-white text-neutral-950">
      <Container>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 py-5 text-xs text-neutral-500 sm:py-7"
        >
          <Link to="/" className="transition hover:text-purple-500">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link to="/products" className="transition hover:text-purple-500">
            Sneakers
          </Link>

          <span aria-hidden="true">/</span>

          <span className="max-w-45 truncate font-medium text-neutral-900">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-8 pb-12 sm:gap-10 lg:grid-cols-[0.6fr_0.9fr] lg:gap-16 lg:pb-20">
          {/* Product image */}
          <div className="min-w-0">
            <div className="product-image relative overflow-hidden rounded-2xl bg-[#f4f4f1] sm:rounded-3xl">
              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                {product.badge && (
                  <span className="bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-900 shadow-sm sm:text-xs">
                    {product.badge}
                  </span>
                )}

                <span
                  className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-semibold sm:text-xs ${
                    product.inStock
                      ? "bg-purple-50 text-purple-700"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      product.inStock ? "bg-purple-500" : "bg-neutral-400"
                    }`}
                  />
                  {product.inStock ? "Available" : "Out of stock"}
                </span>
              </div>

              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => void handleWishlist()}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={wishlisted}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white transition sm:right-6 sm:top-6"
              >
                <Heart
                  size={20}
                  className={
                    wishlisted
                      ? "fill-purple-500 text-purple-500"
                      : "text-neutral-700"
                  }
                />
              </button>

              <div className="h-90">
                {!imageError && product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 px-6 text-center text-neutral-500">
                    <ShoppingBag size={36} strokeWidth={1.3} />
                    <p className="text-sm">Product image unavailable</p>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6">
              <div className="flex items-start gap-3 border border-neutral-200 p-3.5 sm:p-4">
                <Truck
                  size={19}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-purple-500"
                />

                <div>
                  <p className="text-xs font-semibold sm:text-sm">
                    Ready to ship
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-neutral-500 sm:text-xs">
                    {product.inStock
                      ? "Available to order"
                      : "Currently unavailable"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-neutral-200 p-3.5 sm:p-4">
                <ShieldCheck
                  size={19}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-purple-500"
                />

                <div>
                  <p className="text-xs font-semibold sm:text-sm">
                    Secure checkout
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-neutral-500 sm:text-xs">
                    Shop with confidence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="product-info flex min-w-0 flex-col lg:sticky lg:top-8 lg:self-start lg:pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <span className="text-xs text-neutral-500">
                Inclusive of applicable taxes
              </span>
            </div>

            <div className="my-7 h-px bg-neutral-200 sm:my-8" />

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold">About this sneaker</h2>

              <p className="mt-3 text-sm leading-7 text-neutral-600">
                {product.description}
              </p>
            </div>

            {/* Size selection */}
            <div className="mt-8 sm:mt-9">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">Select your size</h2>
                  <p className="mt-1 text-xs text-neutral-500">
                    Choose a size to continue
                  </p>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                  US sizing
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {(product.sizes ?? []).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`flex min-h-12 items-center justify-center border text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                      selectedSize === size
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-neutral-200 bg-white text-neutral-800 hover:border-purple-500 hover:text-purple-500"
                    }`}
                  >
                    {size}

                    {selectedSize === size && (
                      <Check size={13} className="ml-1" />
                    )}
                  </button>
                ))}
              </div>

              {(product.sizes ?? []).length === 0 && (
                <p className="mt-3 text-xs text-neutral-500">
                  Sizes are currently unavailable.
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold">Quantity</h2>

              <div className="flex h-12 w-fit items-center border border-neutral-200">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-full w-12 items-center justify-center text-neutral-600 transition hover:bg-purple-50 hover:text-purple-500 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>

                <span
                  aria-live="polite"
                  className="w-10 text-center text-sm font-semibold tabular-nums"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="flex h-full w-12 items-center justify-center text-neutral-600 transition hover:bg-purple-50 hover:text-purple-500"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              disabled={
                !product.inStock ||
                selectedSize === null ||
                (product.sizes ?? []).length === 0
              }
              onClick={handleAddToCart}
              className="mt-8 flex min-h-14 w-full items-center justify-center gap-3 bg-purple-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />

              {!product.inStock
                ? "Currently sold out"
                : selectedSize === null
                  ? "Select a size to add to bag"
                  : "Add to bag"}

              <ArrowRight size={17} className="ml-auto" />
            </button>

            {!product.inStock && (
              <p className="mt-3 text-center text-xs text-neutral-500">
                This sneaker is currently unavailable.
              </p>
            )}

            <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
              Select your size before adding this sneaker to your bag.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default ProductDetail;
