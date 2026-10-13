import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { token } = useAuth();
  const { refreshCart } = useCart();

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      if (!token || !sessionId) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/payments/verify-session",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Payment verification failed");
        }

        if (!cancelled) {
          setOrderId(data.order.id);
          setStatus("success");
          await refreshCart();
        }
      } catch (error) {
        console.error("Payment verification failed:", error);

        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [token, sessionId, refreshCart]);

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" />
        <h1 className="text-2xl font-bold">Verifying your payment</h1>
        <p className="mt-2 text-neutral-500">
          Please wait while we confirm your order.
        </p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">We couldn't confirm your payment</h1>
        <p className="mt-3 text-neutral-500">
          Your payment status could not be verified. Check your orders before trying again.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/account"
            className="rounded-full bg-neutral-950 px-6 py-3 text-white"
          >
            View orders
          </Link>
          <Link
            to="/products"
            className="rounded-full border px-6 py-3"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-green-700">
        Payment confirmed
      </p>

      <h1 className="mt-3 text-4xl font-black">
        Order placed successfully!
      </h1>

      <p className="mt-4 text-neutral-600">
        Thanks for shopping with KicksHub. Your payment is confirmed and your order has been saved.
      </p>

      {orderId && (
        <p className="mt-5 text-sm text-neutral-500">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 font-semibold text-white"
        >
          <Package size={18} />
          View my orders
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/products"
          className="rounded-full border px-6 py-3 font-semibold"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
