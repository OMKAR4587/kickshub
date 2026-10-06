import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Mail,
  User,
} from "lucide-react";

import Container from "../../components/ui/Container";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import { createOrder } from "../../services/api";

function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { token } = useAuth();
  const { showToast } = useToast();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!token) {
      showToast(
        "Please log in before placing your order",
        "error",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await createOrder(token);

      if (!data.success) {
        showToast(
          data.message || "Failed to place order",
          "error",
        );
        return;
      }

      await clearCart();

      setIsSubmitted(true);

      showToast(
        "Order placed successfully",
        "success",
      );
    } catch (error) {
      console.error(
        "Failed to place order:",
        error,
      );

      showToast(
        "Something went wrong. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-[70vh] bg-neutral-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
              <CreditCard size={26} />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-purple-600">
              Checkout
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
              Add something fresh to your rotation before
              heading to checkout.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              Shop sneakers
              <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section className="min-h-[70vh] bg-neutral-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/20">
              <Check size={38} strokeWidth={3} />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-green-600">
              Order confirmed
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
              You&apos;re all set.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
              Your order has been created successfully.
              Your kicks are now in the queue.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/account"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                View account
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-4 text-sm font-bold text-neutral-900 transition hover:border-neutral-500"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-50 py-10 sm:py-10 lg:py-10">
      <Container>
        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/cart"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to cart
          </Link>

          <div className="hidden items-center gap-2 text-xs font-semibold text-neutral-400 sm:flex">
            <Lock size={14} />
            Secure checkout
          </div>
        </div>

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-600">
            KicksHub checkout
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
            Finish your
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              move.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Enter your delivery details and secure your
            latest pair. No distractions. Just checkout.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 hidden items-center gap-3 sm:flex">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-950">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs text-white">
              1
            </span>
            Details
          </div>

          <div className="h-px w-16 bg-neutral-200" />

          <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs">
              2
            </span>
            Payment
          </div>

          <div className="h-px w-16 bg-neutral-200" />

          <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs">
              3
            </span>
            Confirmation
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* LEFT */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Contact */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <Mail size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-neutral-950">
                    Contact information
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Where should we send your order updates?
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-neutral-950">
                    Shipping address
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Where should we deliver your sneakers?
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="h-13 w-full rounded-2xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    type="text"
                    required
                    placeholder="123 Main Street"
                    className="h-13 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    required
                    placeholder="Mumbai"
                    className="h-13 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postal"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Postal code
                  </label>

                  <input
                    id="postal"
                    type="text"
                    required
                    placeholder="400001"
                    className="h-13 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Country
                  </label>

                  <select
                    id="country"
                    required
                    defaultValue="India"
                    className="h-13 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-neutral-950">
                    Payment
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Secure payment processing.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-start gap-4 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-5">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <p className="text-sm font-bold text-neutral-950">
                    Secure checkout
                  </p>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Stripe payment processing will be
                    connected here next.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-neutral-950 px-6 text-sm font-bold text-white shadow-xl shadow-neutral-950/10 transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Placing order...
                </>
              ) : (
                <>
                  Place order
                  <span className="h-5 w-px bg-white/20" />
                  ₹{cartTotal.toFixed(2)}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-2 text-center text-xs text-neutral-400">
              <Lock size={13} />
              Your information is protected with secure
              checkout.
            </p>
          </form>

          {/* RIGHT — ORDER SUMMARY */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              {/* Summary header */}
              <div className="border-b border-neutral-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
                      Your order
                    </p>

                    <h2 className="mt-1 text-xl font-black text-neutral-950">
                      Order summary
                    </h2>
                  </div>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600">
                    {items.length}{" "}
                    {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="max-h-107.5 space-y-5 overflow-auto p-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-neutral-50">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-contain"
                      />

                      <span className="absolute right-1.5 top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold leading-5 text-neutral-950">
                        {item.product.name}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                        <span>
                          Size {item.size}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-neutral-300" />

                        <span>
                          Qty {item.quantity}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-bold text-neutral-950">
                        ₹
                        {(
                          Number(item.product.price) *
                          item.quantity
                        ).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-neutral-100 bg-neutral-50 p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal</span>

                    <span className="font-medium text-neutral-900">
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-500">
                    <span>Shipping</span>

                    <span className="font-bold text-green-600">
                      Free
                    </span>
                  </div>

                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                          Total
                        </p>

                        <p className="mt-1 text-2xl font-black tracking-tight text-neutral-950">
                          ₹
                          {cartTotal.toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </p>
                      </div>

                      <span className="text-xs font-medium text-neutral-400">
                        INR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <Truck
                  size={18}
                  className="text-purple-600"
                />

                <p className="mt-3 text-xs font-bold text-neutral-950">
                  Free shipping
                </p>

                <p className="mt-1 text-[11px] leading-4 text-neutral-400">
                  On every order
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <ShieldCheck
                  size={18}
                  className="text-green-600"
                />

                <p className="mt-3 text-xs font-bold text-neutral-950">
                  Secure checkout
                </p>

                <p className="mt-1 text-[11px] leading-4 text-neutral-400">
                  Protected payment
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default Checkout;