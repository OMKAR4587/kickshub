import Stripe from "stripe";

import { prisma } from "../lib/prisma.js";

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const userId = session.metadata?.userId;

  if (!userId) {
    throw new Error(
      "Stripe session is missing userId metadata",
    );
  }

  if (session.payment_status !== "paid") {
    return;
  }

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId,
      status: "PAID",
      createdAt: {
        gte: new Date(Date.now() - 10 * 60 * 1000),
      },
    },
  });

  if (existingOrder) {
    return existingOrder;
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = cart.items.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) * item.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      status: "PAID",
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return order;
}