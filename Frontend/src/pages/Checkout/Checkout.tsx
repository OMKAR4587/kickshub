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
  ShoppingBag,
} from "lucide-react";

import Container from "../../components/ui/Container";
import CheckoutProgress from "../../components/ui/CheckoutProgress";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { createCheckoutSession } from "../../services/api";

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5";

const labelClass =
  "mb-2 block text-sm font-medium text-neutral-700";

function Checkout() {
  const { items, cartTotal } = useCart();
  const { token } = useAuth();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

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
        showToast(
          data.message || "Unable to start payment",
          "error",
        );
        return;
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error("Failed to start checkout:", error);

      showToast(
        "Unable to start payment. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-md py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag
                size={27}
                strokeWidth={1.5}
                className="text-neutral-700"
              />
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
              Your cart is empty
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Looks like you haven't added any sneakers yet.
              Find your next favourite pair.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Explore sneakers
              <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-16 pt-6 sm:pt-10">
      <Container>
        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-950"
          >
            <ArrowLeft size={16} />
            <span>Back to bag</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Lock size={13} />
            Secure checkout
          </div>
        </div>

        {/* Heading */}
        <header className="mb-8 border-b border-neutral-200 pb-7 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            KICKSHUB / CHECKOUT
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            A few details, then your new pair is almost yours.
          </p>
        </header>

        {/* Progress */}
        <div className="mb-10">
          <CheckoutProgress currentStep={1} />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          {/* Form */}
          <div className="min-w-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <section className="border-b border-neutral-200 pb-8">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-neutral-200">
                    <User size={17} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-neutral-950">
                      Contact details
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Where can we reach you?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      Full name
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* Shipping */}
              <section className="border-b border-neutral-200 pb-8">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-neutral-200">
                    <MapPin size={17} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-neutral-950">
                      Delivery address
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Where should your sneakers arrive?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="address" className={labelClass}>
                      Street address
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="House number, street and area"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className={labelClass}>
                        City
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Your city"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className={labelClass}
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
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className={labelClass}>
                      Country
                    </label>

                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      defaultValue="India"
                      required
                      className={inputClass}
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-neutral-200">
                    <CreditCard size={17} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-neutral-950">
                      Payment
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Secure payment with Stripe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4">
                  <ShieldCheck
                    size={19}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-neutral-700"
                  />

                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Your payment is protected
                    </p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      You'll continue to Stripe's secure checkout
                      to complete your payment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      />
                      Connecting to payment...
                    </>
                  ) : (
                    <>
                      Continue to payment
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
                  <Lock
                    size={12}
                    className="mr-1 inline-block align-[-2px]"
                  />
                  Secure checkout · Your card details stay protected
                </p>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <aside className="min-w-0 lg:sticky lg:top-6">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-950">
                  Order summary
                </h2>

                <span className="text-xs text-neutral-500">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex items-start gap-3"
                  >
                    <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag
                            size={22}
                            className="text-neutral-400"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="line-clamp-2 text-sm font-medium leading-5 text-neutral-900">
                        {item.name}
                      </p>

                      <p className="mt-1.5 text-xs text-neutral-500">
                        Size {item.size} · Qty {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-neutral-950">
                        ₹
                        {(
                          Number(item.price) * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-dashed border-neutral-200" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-neutral-900">
                    ₹{Number(cartTotal).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="font-medium text-neutral-900">
                    Free
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-neutral-200" />

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-950">
                    Total
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    INR · Inclusive of applicable charges
                  </p>
                </div>

                <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                  ₹{Number(cartTotal).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-lg bg-neutral-50 p-3.5">
                <Truck
                  size={18}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-neutral-600"
                />

                <div>
                  <p className="text-xs font-semibold text-neutral-800">
                    Delivery to your doorstep
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Delivery details will be confirmed with your order.
                  </p>
                </div>
              </div>

              <Link
                to="/cart"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
              >
                <ArrowLeft size={15} />
                Edit bag
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 py-2 text-xs text-neutral-500">
              <ShieldCheck size={15} />
              Secure payments powered by Stripe
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}

export default Checkout;