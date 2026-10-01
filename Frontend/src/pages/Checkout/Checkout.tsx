import { useState } from "react"
import { Link } from "react-router-dom"
import { Lock, ShieldCheck, Truck } from "lucide-react"

import Container from "../../components/ui/Container"
import { useCart } from "../../context/CartContext"
import { useToast } from "../../context/ToastContext"

function Checkout() {
  const { items, cartTotal } = useCart()
  const { showToast } = useToast()

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitted(true)

    showToast(
      "Order details saved successfully",
      "success",
    )
  }

  if (items.length === 0) {
    return (
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              Checkout
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Your cart is empty
            </h1>

            <p className="mt-4 text-neutral-500">
              Add some sneakers before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Shop sneakers
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
            Checkout
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Complete your order
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Enter your details to continue.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8"
          >
            <div>
              <h2 className="text-xl font-semibold">
                Contact information
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-neutral-100 pt-8">
              <h2 className="text-xl font-semibold">
                Shipping address
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    type="text"
                    required
                    placeholder="123 Main Street"
                    className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    required
                    placeholder="Mumbai"
                    className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postal"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Postal code
                  </label>

                  <input
                    id="postal"
                    type="text"
                    required
                    placeholder="400001"
                    className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Country
                  </label>

                  <select
                    id="country"
                    required
                    defaultValue="India"
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-neutral-100 pt-8">
              <h2 className="text-xl font-semibold">
                Payment
              </h2>

              <div className="mt-5 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-5">
                <div className="flex items-start gap-3">
                  <Lock
                    size={20}
                    className="mt-0.5 text-purple-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      Secure payment
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      Payment processing will be connected
                      with Stripe later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-green-600"
            >
              {isSubmitted
                ? "Order details saved ✓"
                : `Place Order • $${cartTotal.toFixed(2)}`}
            </button>
          </form>

          {/* Order summary */}
          <aside className="h-fit rounded-3xl bg-[#f8fafc] p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold">
              Order summary
            </h2>

            <div className="mt-6 space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Size {item.size} · Qty {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      $
                      {(
                        item.product.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-neutral-200 pt-6 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-6">
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <ShieldCheck
                  size={17}
                  className="text-purple-600"
                />
                Secure checkout
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <Truck
                  size={17}
                  className="text-purple-600"
                />
                Free shipping
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default Checkout