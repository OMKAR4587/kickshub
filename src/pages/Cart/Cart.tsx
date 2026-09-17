import { Minus, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

import Container from "../../components/ui/Container"
import { useCart } from "../../context/CartContext"

function Cart() {
  const {
    items,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart()

  if (items.length === 0) {
    return (
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              Cart
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Your cart is empty
            </h1>

            <p className="mt-4 text-neutral-500">
              Looks like you haven't added any sneakers yet.
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
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
            Your bag
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Shopping Cart
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 rounded-3xl border border-neutral-100 bg-white p-4 sm:p-5"
              >
                {/* Image */}
                <Link
                  to={`/products/${item.product.id}`}
                  className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#f5f7fb] sm:h-36 sm:w-36"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-contain p-2"
                  />
                </Link>

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-neutral-400">
                        {item.product.category}
                      </p>

                      <Link
                        to={`/products/${item.product.id}`}
                        className="mt-1 block truncate text-base font-semibold text-neutral-900"
                      >
                        {item.product.name}
                      </Link>

                      <p className="mt-1 text-sm text-neutral-500">
                        Size {item.size}
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold">
                      $
                      {item.product.price *
                        item.quantity}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    {/* Quantity */}
                    <div className="flex h-9 items-center rounded-lg border border-neutral-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        className="flex h-full w-9 items-center justify-center text-neutral-500 hover:text-black"
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
                        className="flex h-full w-9 items-center justify-center text-neutral-500 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.size,
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
          <aside className="h-fit rounded-3xl bg-[#f8fafc] p-6">
            <h2 className="text-lg font-semibold">
              Order summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>

              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between text-base font-bold text-neutral-900">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex h-13 items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Continue to Checkout
            </Link>

            <Link
              to="/products"
              className="mt-3 flex justify-center py-2 text-sm font-medium text-neutral-500 hover:text-black"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default Cart