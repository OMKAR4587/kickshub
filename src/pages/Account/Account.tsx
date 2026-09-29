import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  LogOut,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function Account() {
  const {
    user,
    loading,
    isAuthenticated,
    openAuthModal,
    logout,
  } = useAuth();

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />
      </main>
    );
  }

  /*
   * ============================================================
   * SIGNED OUT
   * ============================================================
   */

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-white">
              <User size={21} />
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-600">
              My account
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-neutral-950 sm:text-5xl">
              Account
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
              Sign in to manage your profile, wishlist,
              orders and shopping activity.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-purple-600"
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-100"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * ACCOUNT
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* ======================================================
            PAGE HEADER
        ======================================================= */}

        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-600">
              My account
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-neutral-950 sm:text-4xl">
              Welcome, {user?.name}
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Manage your KicksHub account and shopping activity.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-auto"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>

        {/* ======================================================
            PROFILE
        ======================================================= */}

        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white">
          <div className="flex flex-col gap-6 p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                <User size={22} />
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight text-neutral-950">
                  {user?.name}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-700">
                Active member
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================
            OVERVIEW
        ======================================================= */}

        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-neutral-950">
              Overview
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Your current KicksHub activity.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Heart size={18} />
                </div>

                <ArrowRight
                  size={17}
                  className="text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-neutral-600"
                />
              </div>

              <p className="mt-6 text-3xl font-black tracking-[-0.04em] text-neutral-950">
                {wishlist.length}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Wishlist items
              </p>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShoppingBag size={18} />
                </div>

                <ArrowRight
                  size={17}
                  className="text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-neutral-600"
                />
              </div>

              <p className="mt-6 text-3xl font-black tracking-[-0.04em] text-neutral-950">
                {cartCount}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Cart items
              </p>
            </Link>

            {/* Orders */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                <Package size={18} />
              </div>

              <p className="mt-6 text-3xl font-black tracking-[-0.04em] text-neutral-950">
                0
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Orders
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            ACCOUNT INFORMATION
        ======================================================= */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Account details */}
          <section className="rounded-2xl border border-neutral-200 bg-white">
            <div className="border-b border-neutral-100 px-6 py-5">
              <h2 className="text-base font-bold text-neutral-950">
                Account information
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Your basic account details.
              </p>
            </div>

            <div className="divide-y divide-neutral-100">
              <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Full name
                </span>

                <span className="text-sm font-medium text-neutral-900">
                  {user?.name}
                </span>
              </div>

              <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Email
                </span>

                <span className="text-sm font-medium text-neutral-900">
                  {user?.email}
                </span>
              </div>

              <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Membership
                </span>

                <span className="text-sm font-medium text-neutral-900">
                  KicksHub Member
                </span>
              </div>
            </div>
          </section>

          {/* Quick links */}
          <section className="rounded-2xl border border-neutral-200 bg-white">
            <div className="border-b border-neutral-100 px-6 py-5">
              <h2 className="text-base font-bold text-neutral-950">
                Quick links
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Jump to your KicksHub essentials.
              </p>
            </div>

            <div className="p-3">
              <Link
                to="/wishlist"
                className="group flex items-center justify-between rounded-xl px-3 py-3.5 transition hover:bg-neutral-50"
              >
                <div className="flex items-center gap-3">
                  <Heart
                    size={17}
                    className="text-neutral-500"
                  />

                  <span className="text-sm font-medium text-neutral-800">
                    Wishlist
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="text-neutral-300 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/cart"
                className="group flex items-center justify-between rounded-xl px-3 py-3.5 transition hover:bg-neutral-50"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag
                    size={17}
                    className="text-neutral-500"
                  />

                  <span className="text-sm font-medium text-neutral-800">
                    Shopping cart
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="text-neutral-300 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/products"
                className="group flex items-center justify-between rounded-xl px-3 py-3.5 transition hover:bg-neutral-50"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag
                    size={17}
                    className="text-neutral-500"
                  />

                  <span className="text-sm font-medium text-neutral-800">
                    Continue shopping
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="text-neutral-300 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <div className="flex items-center justify-between rounded-xl px-3 py-3.5 opacity-50">
                <div className="flex items-center gap-3">
                  <Package
                    size={17}
                    className="text-neutral-500"
                  />

                  <span className="text-sm font-medium text-neutral-800">
                    Order history
                  </span>
                </div>

                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                  Soon
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-10 border-t border-neutral-200 pt-6">
          <p className="text-center text-[11px] text-neutral-400">
            KicksHub · Premium sneakers & streetwear
          </p>
        </div>
      </div>
    </main>
  );
}

export default Account;