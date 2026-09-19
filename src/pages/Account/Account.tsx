import { useState } from "react"
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Heart,
  LogOut,
  Mail,
  Package,
  ShoppingBag,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"

import Container from "../../components/ui/Container"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"
import { useToast } from "../../context/ToastContext"

type Mode = "login" | "register"

function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mode, setMode] = useState<Mode>("login")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const { showToast } = useToast()

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!email || !password) {
      showToast(
        "Please enter your email and password",
        "warning",
      )
      return
    }

    if (mode === "register" && !name.trim()) {
      showToast(
        "Please enter your name",
        "warning",
      )
      return
    }

    setIsLoggedIn(true)

    showToast(
      mode === "login"
        ? "Welcome back to KicksHub"
        : "Your KicksHub account is ready",
      "success",
    )
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setName("")
    setEmail("")
    setPassword("")

    showToast("You've been logged out", "info")
  }

  /* --------------------------------------------------
     AUTH VIEW
  -------------------------------------------------- */

  if (!isLoggedIn) {
    return (
      <section className="relative min-h-[calc(100vh-52px)] overflow-hidden bg-white py-8 sm:py-16 lg:py-10">
        {/* Background decoration */}
        <div
          className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
          aria-hidden="true"
        />

        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_460px] lg:gap-20">
            {/* Left content */}
            <div className="relative max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />

                <span className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
                  KicksHub account
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.06em] text-neutral-950 sm:text-6xl lg:text-8xl">
                {mode === "login" ? (
                  <>
                    Welcome
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      back.
                    </span>
                  </>
                ) : (
                  <>
                    Start your
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      rotation.
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-neutral-500 sm:text-lg">
                {mode === "login"
                  ? "Sign in to manage your orders, wishlist, and sneaker collection."
                  : "Create your account and keep every favorite pair, order, and detail in one place."}
              </p>

              {/* Mini benefits */}
              <div className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                  <Package
                    size={19}
                    className="text-purple-600"
                  />

                  <p className="mt-5 text-sm font-semibold text-neutral-900">
                    Track orders
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Keep an eye on every delivery.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                  <Heart
                    size={19}
                    className="text-purple-600"
                  />

                  <p className="mt-5 text-sm font-semibold text-neutral-900">
                    Save favorites
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Your wishlist stays with you.
                  </p>
                </div>
              </div>
            </div>

            {/* Auth card */}
            <div className="relative">
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.07)] sm:p-8">
                {/* Tabs */}
                <div className="flex rounded-full bg-neutral-100 p-1">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
                      mode === "login"
                        ? "bg-white text-neutral-950 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    Sign in
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
                      mode === "register"
                        ? "bg-white text-neutral-950 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    Create account
                  </button>
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-black tracking-tight text-neutral-950">
                    {mode === "login"
                      ? "Sign in"
                      : "Create account"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {mode === "login"
                      ? "Enter your details to continue."
                      : "It only takes a moment to get started."}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >
                  {/* Name */}
                  {mode === "register" && (
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                      >
                        Full name
                      </label>

                      <div className="relative">
                        <User
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />

                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(event) =>
                            setName(event.target.value)
                          }
                          placeholder="Your name"
                          className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-xs font-bold uppercase tracking-wider text-neutral-500"
                      >
                        Password
                      </label>

                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() =>
                            showToast(
                              "Password reset will be available with the backend.",
                              "info",
                            )
                          }
                          className="text-xs font-semibold text-purple-600 hover:text-purple-700"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-purple-600"
                  >
                    {mode === "login"
                      ? "Sign in"
                      : "Create account"}

                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </form>

                <div className="mt-6 flex items-center gap-3 text-xs text-neutral-400">
                  <span className="h-px flex-1 bg-neutral-200" />

                  Secure account

                  <span className="h-px flex-1 bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  /* --------------------------------------------------
     LOGGED-IN ACCOUNT
  -------------------------------------------------- */

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
              My Account<span className="text-purple-600">.</span>
            </h1>

            <p className="mt-4 text-sm text-neutral-500 sm:text-base">
              Welcome back{email ? `, ${email}` : ""}.
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
                  {name || "KicksHub Member"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 py-4">
                <span className="text-sm text-neutral-500">
                  Email
                </span>

                <span className="max-w-[60%] truncate text-right text-sm font-semibold text-neutral-900">
                  {email}
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