import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Heart,
  LogOut,
  Package,
  ShoppingBag,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"

import Container from "../../components/ui/Container"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"
import { useToast } from "../../context/ToastContext"
import { useAuth } from "../../context/AuthContext"

function Account() {
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const { showToast } = useToast()

  const {
    user,
    isAuthenticated,
    loading,
    logout,
  } = useAuth()

  const handleLogout = () => {
    logout()

    showToast(
      "You've been logged out",
      "info",
    )
  }

  /*
   * --------------------------------------------------
   * AUTH LOADING
   * --------------------------------------------------
   */

  if (loading) {
    return (
      <section className="flex min-h-[calc(100vh-52px)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-purple-600" />

          <p className="mt-4 text-sm text-neutral-500">
            Loading your account...
          </p>
        </div>
      </section>
    )
  }

  /*
   * --------------------------------------------------
   * NOT AUTHENTICATED
   * --------------------------------------------------
   */

  if (!isAuthenticated) {
    return (
      <section className="relative flex min-h-[calc(100vh-52px)] items-center justify-center overflow-hidden py-16">
        <div
          className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
          aria-hidden="true"
        />

        <Container>
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-950 text-white">
              <User size={25} />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-purple-600">
              KicksHub account
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-5xl">
              Sign in to your account.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
              Access your wishlist, cart, profile, and
              future orders from one place.
            </p>

            <Link
              to="/"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-purple-600"
            >
              Continue shopping

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  /*
   * --------------------------------------------------
   * LOGGED-IN ACCOUNT
   * --------------------------------------------------
   */

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        {/* Header */}
        <div className="relative mb-10 flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
                Your account
              </span>
            </div>

            <h1 className="text-5xl font-black leading-none tracking-[-0.05em] text-neutral-950 sm:text-6xl">
              My Account
              <span className="text-purple-600">.</span>
            </h1>

            <p className="mt-4 text-sm text-neutral-500 sm:text-base">
              Welcome back
              {user?.name ? `, ${user.name}` : ""}.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            to="/wishlist"
            className="group rounded-3xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Heart size={19} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-neutral-300 transition group-hover:text-purple-600"
              />
            </div>

            <p className="mt-6 text-3xl font-black tracking-tight text-neutral-950">
              {wishlist.length}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Wishlist items
            </p>
          </Link>

          <Link
            to="/cart"
            className="group rounded-3xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShoppingBag size={19} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-neutral-300 transition group-hover:text-blue-600"
              />
            </div>

            <p className="mt-6 text-3xl font-black tracking-tight text-neutral-950">
              {cartCount}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Cart items
            </p>
          </Link>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-950 p-5 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Check size={19} />
            </div>

            <p className="mt-6 text-lg font-bold">
              KicksHub member
            </p>

            <p className="mt-1 text-sm text-neutral-400">
              Your account is ready to go.
            </p>
          </div>
        </div>

        {/* Main dashboard */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Profile */}
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Profile
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950">
                  Account details
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100">
                <User
                  size={20}
                  className="text-neutral-600"
                />
              </div>
            </div>

            <div className="mt-8 divide-y divide-neutral-100">
              <div className="flex items-center justify-between gap-5 py-4">
                <span className="text-sm text-neutral-500">
                  Name
                </span>

                <span className="text-right text-sm font-semibold text-neutral-900">
                  {user?.name || "KicksHub Member"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 py-4">
                <span className="text-sm text-neutral-500">
                  Email
                </span>

                <span className="max-w-[60%] truncate text-right text-sm font-semibold text-neutral-900">
                  {user?.email}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 py-4">
                <span className="text-sm text-neutral-500">
                  Membership
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Account links */}
          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
              Shortcuts
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950">
              Keep moving.
            </h2>

            <div className="mt-7 space-y-2">
              <Link
                to="/products"
                className="group flex items-center justify-between rounded-2xl bg-white p-4 transition hover:bg-neutral-950 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} />

                  <span className="text-sm font-semibold">
                    Browse sneakers
                  </span>
                </div>

                <ChevronRight
                  size={17}
                  className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>

              <Link
                to="/wishlist"
                className="group flex items-center justify-between rounded-2xl bg-white p-4 transition hover:bg-neutral-950 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Heart size={18} />

                  <span className="text-sm font-semibold">
                    View wishlist
                  </span>
                </div>

                <ChevronRight
                  size={17}
                  className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>

              <Link
                to="/cart"
                className="group flex items-center justify-between rounded-2xl bg-white p-4 transition hover:bg-neutral-950 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} />

                  <span className="text-sm font-semibold">
                    Open cart
                  </span>
                </div>

                <ChevronRight
                  size={17}
                  className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                Orders
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950">
                Your orders
              </h2>
            </div>

            <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-500">
              Coming with backend
            </span>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center rounded-2xl bg-neutral-50 px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <Package
                size={23}
                className="text-neutral-400"
              />
            </div>

            <h3 className="mt-5 text-base font-bold text-neutral-900">
              No orders yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Once you place your first order, your
              order history will appear here.
            </p>

            <Link
              to="/products"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-neutral-900 transition hover:text-purple-600"
            >
              Start shopping

              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Account