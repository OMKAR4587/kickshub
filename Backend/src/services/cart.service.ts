import { prisma } from "../lib/prisma.js";

export async function getCart(userId: string) {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function addToCart(
  userId: string,
  productId: string,
  size: number,
  quantity: number,
) {
  let cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId_size: {
        cartId: cart.id,
        productId,
        size,
      },
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
      include: {
        product: true,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      size,
      quantity,
    },
    include: {
      product: true,
    },
  });
}

export async function updateCartItem(
  userId: string,
  itemId: string,
  quantity: number,
) {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (!item) {
    throw new Error("Cart item not found");
  }

  if (quantity <= 0) {
    return prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });
  }

  return prisma.cartItem.update({
    where: {
      id: itemId,
    },
    data: {
      quantity,
    },
    include: {
      product: true,
    },
  });
}

export async function removeFromCart(
  userId: string,
  itemId: string,
) {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (!item) {
    throw new Error("Cart item not found");
  }

  return prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
}

export async function clearCart(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    return;
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });
}