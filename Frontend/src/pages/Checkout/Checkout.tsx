import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Mail,
  User,
} from "lucide-react";

import Container from "../../components/ui/Container";
import CheckoutProgress from "../../components/ui/CheckoutProgress";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { createCheckoutSession } from "../../services/api";

function Checkout() {
  const { items, cartTotal } = useCart();
  const { token } = useAuth();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    if (!token) {
      showToast("Please log in before placing your order", "error");
      return;
    }

    if (items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await createCheckoutSession(token);

      if (!data.success || !data.url) {
        showToast(data.message || "Unable to start payment", "error");
        return;
      }

      // Redirect to Stripe hosted checkout
      window.location.assign(data.url);
    } catch (error) {
      console.error("Failed to start checkout:", error);

      showToast("Unable to start payment. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <CreditCard size={30} className="text-neutral-500" />
            </div>

            <h1 className="text-2xl font-bold text-neutral-900">
              Your cart is empty
            </h1>

            <p className="mt-3 text-neutral-600">
              Add some sneakers to your cart before checking out.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700"
            >
              Explore Sneakers
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-4 sm:py-4">
      <Container>
        {/* Back link */}
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            KicksHub Checkout
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
            Complete your order
          </h1>

          <p className="mt-3 max-w-xl text-neutral-600">
            Review your details and continue to our secure payment page.
          </p>
        </div>

        {/* Checkout progress */}
        <CheckoutProgress currentStep={1} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact details */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                    <User size={21} className="text-neutral-800" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">
                      Contact information
                    </h2>
                    <p className="text-sm text-neutral-500">
                      Your contact details
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-neutral-700"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        aria-hidden="true"
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-semibold text-neutral-700"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        aria-hidden="true"
                      />
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Shipping details */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                    <MapPin size={21} className="text-neutral-800" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">
                      Shipping address
                    </h2>
                    <p className="text-sm text-neutral-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-neutral-700"
                    >
                      Street address
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="House number, street, area"
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-semibold text-neutral-700"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Your city"
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mb-2 block text-sm font-semibold text-neutral-700"
                      >
                        PIN code
                      </label>

                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        placeholder="6-digit PIN code"
                        title="Enter a valid 6-digit PIN code"
                        required
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-semibold text-neutral-700"
                    >
                      Country
                    </label>

                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      defaultValue="India"
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment information */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                    <CreditCard size={21} className="text-neutral-800" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">
                      Payment
                    </h2>
                    <p className="text-sm text-neutral-500">
                      Secure payment powered by Stripe
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <div>
                    <p className="font-semibold text-neutral-900">
                      Secure checkout
                    </p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      You will be redirected to Stripe to complete your payment
                      securely. Your card details are not entered on this page.
                    </p>
                  </div>
                </div>
              </section>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Redirecting to payment...
                  </>
                ) : (
                  <>
                    <Lock size={17} />
                    Continue to Payment
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-neutral-500">
                By continuing, you agree to complete your purchase through our
                secure payment provider.
              </p>
            </form>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-15">
            <h2 className="text-xl font-bold text-neutral-950">
              Order summary
            </h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-start gap-3"
                >
                  {/* Product image */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <CreditCard size={22} className="text-neutral-400" />
                    )}
                  </div>

                  {/* Product details */}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Size: {item.size} · Qty: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-bold text-neutral-900">
                      ₹
                      {(
                        Number(item.product.price) * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-neutral-200" />

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold text-neutral-900">
                  ₹{Number(cartTotal).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">Tax</span>
                <span className="text-neutral-500">Included if applicable</span>
              </div>
            </div>

            <div className="my-6 border-t border-neutral-200" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-base font-bold text-neutral-950">
                Total
              </span>
              <span className="text-2xl font-black text-neutral-950">
                ₹{Number(cartTotal).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck size={19} className="mt-0.5 shrink-0 text-neutral-500" />

                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Reliable delivery
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Shipping options are confirmed during order processing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-neutral-500"
                />

                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Secure payment
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Your payment is processed securely by Stripe.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/cart"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950"
            >
              <ArrowLeft size={16} />
              Edit cart
            </Link>
          </aside>
        </div>
      </Container>
    </div>
  );
}

export default Checkout;
