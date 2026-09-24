import { useEffect, useRef } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Container from "../../../components/ui/Container";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";

function Cart() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();

  const { showToast } = useToast();

  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".cart-item", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".cart-summary", {
        opacity: 0,
        x: 20,
        duration: 0.6,
        delay: 0.15,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [items.length]);

  const handleRemove = (
    productId: string,
    size: number,
    productName: string,
  ) => {
    removeFromCart(productId, size);

    showToast(`${productName} removed from your cart`, "success");
  };

  if (items.length === 0) {
    return (
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
              <Trash2 size={28} className="text-neutral-400" />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              Your bag
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Your cart is empty
            </h1>

            <p className="mt-4 text-neutral-500">
              Looks like you haven't added any sneakers yet.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
            >
              Shop sneakers
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={pageRef} className="py-12 sm:py-16 lg:py-20">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
            Your bag
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="cart-item flex gap-4 rounded-3xl border border-neutral-100 bg-white p-4 sm:p-5"
              >
                {/* Product image */}
                <Link
                  to={`/products/${item.product.id}`}
                  className="flex h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#f5f7fb] transition hover:bg-neutral-100 sm:h-36 sm:w-36"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </Link>
                {/* Product info */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-neutral-400">
                        {item.product.category}
                      </p>

                      <Link
                        to={`/products/${item.product.id}`}
                        className="mt-1 block truncate text-base font-semibold text-neutral-900 transition hover:text-purple-600"
                      >
                        {item.product.name}
                      </Link>

                      <p className="mt-1 text-sm text-neutral-500">
                        Size {item.size}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        ₹{item.product.price.toLocaleString("en-IN")} each
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold text-neutral-900">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                    {/* Quantity */}
                    <div className="flex h-10 items-center rounded-xl border border-neutral-200">
                      <button
                        type="button"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        aria-label={`Decrease ${item.product.name} quantity`}
                        className="flex h-full w-10 items-center justify-center text-neutral-500 transition hover:scale-110 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                        aria-label={`Increase ${item.product.name} quantity`}
                        className="flex h-full w-10 items-center justify-center text-neutral-500 transition hover:scale-110 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(
                          item.product.id,
                          item.size,
                          item.product.name,
                        )
                      }
                      className="flex items-center gap-2 text-xs font-medium text-neutral-400 transition hover:text-red-500"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="cart-summary h-fit rounded-3xl bg-[#f8fafc] p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold">Order summary</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between text-base font-bold text-neutral-900">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex h-14 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
            >
              Continue to Checkout
            </Link>

            <Link
              to="/products"
              className="mt-3 flex justify-center py-2 text-sm font-medium text-neutral-500 transition hover:text-black"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default Cart;
