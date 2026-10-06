import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  Heart,
  LogOut,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

import { getOrders } from "../../services/api";

type OrderItem = {
  id: string;
  quantity: number;
  size: number;
  price: string | number;
  product: {
    id: string;
    name: string;
    image: string;
  };
};

type Order = {
  id: string;
  total: string | number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

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
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  /*
   * ============================================================
   * LOAD ORDERS
   * ============================================================
   */

  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }

    async function loadOrders() {
      const token = localStorage.getItem("kickshub_token");

      if (!token) {
        return;
      }

      try {
        setOrdersLoading(true);

        const data = await getOrders(token);

        if (!data.success) {
          showToast(
            data.message || "Failed to load orders",
            "error",
          );
          return;
        }

        setOrders(data.orders ?? []);
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error,
        );

        showToast(
          "Failed to load your orders",
          "error",
        );
      } finally {
        setOrdersLoading(false);
      }
    }

    loadOrders();
  }, [isAuthenticated, showToast]);

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

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

            <h1 className="mt-3 text-4xl font-black tracking-tighter text-neutral-950 sm:text-5xl">
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
                onClick={() =>
                  openAuthModal("register")
                }
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

            <h1 className="mt-2 text-3xl font-black tracking-tighter text-neutral-950 sm:text-4xl">
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
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <Package size={18} />
                </div>

                {ordersLoading && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-700" />
                )}
              </div>

              <p className="mt-6 text-3xl font-black tracking-[-0.04em] text-neutral-950">
                {orders.length}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Orders
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            ORDER HISTORY
        ======================================================= */}

        <div className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-neutral-950">
                Order history
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Your recent KicksHub orders.
              </p>
            </div>
          </div>

          {ordersLoading ? (
            <section className="rounded-2xl border border-neutral-200 bg-white">
              <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />

                <p className="mt-4 text-sm text-neutral-500">
                  Loading your orders...
                </p>
              </div>
            </section>
          ) : orders.length === 0 ? (
            <section className="rounded-2xl border border-neutral-200 bg-white">
              <div className="px-6 py-12 text-center sm:py-14">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                  <Package size={20} />
                </div>

                <h3 className="mt-4 text-base font-bold text-neutral-950">
                  No orders yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-neutral-500">
                  Your order history will appear here after
                  you place your first order.
                </p>

                <Link
                  to="/products"
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-950 px-5 text-xs font-semibold text-white transition hover:bg-purple-600"
                >
                  Start shopping
                  <ArrowRight size={15} />
                </Link>
              </div>
            </section>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <section
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                >
                  {/* Order header */}

                  <div className="flex flex-col gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-sm font-bold text-neutral-950">
                          Order #
                          {order.id
                            .slice(-8)
                            .toUpperCase()}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                            order.status === "PAID"
                              ? "bg-green-50 text-green-700"
                              : order.status ===
                                  "CANCELLED"
                                ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} />

                          {new Date(
                            order.createdAt,
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-neutral-300" />

                        <span>
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "item"
                            : "items"}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        Order total
                      </p>

                      <p className="mt-1 text-lg font-black text-neutral-950">
                        ₹
                        {Number(
                          order.total,
                        ).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Order items */}

                  <div className="divide-y divide-neutral-100">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-5 sm:p-6"
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-50">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold text-neutral-950">
                            {item.product.name}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                            <span>
                              Size {item.size}
                            </span>

                            <span className="text-neutral-300">
                              •
                            </span>

                            <span>
                              Qty {item.quantity}
                            </span>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-neutral-950">
                          ₹
                          {Number(
                            item.price,
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
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

              {/* Wishlist */}

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

              {/* Cart */}

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

              {/* Continue shopping */}

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

              {/* Order history */}

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("order-history")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="group flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition hover:bg-neutral-50"
              >
                <div className="flex items-center gap-3">
                  <Package
                    size={17}
                    className="text-neutral-500"
                  />

                  <span className="text-sm font-medium text-neutral-800">
                    Order history
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="text-neutral-300 transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </section>
        </div>

        {/* ======================================================
            FOOTER NOTE
        ======================================================= */}

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