import { prisma } from "../lib/prisma.js";

export async function getWishlist(userId: string) {
  return prisma.wishlist.findMany({
    where: {
      userId,
    },
    select: {
      productId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addToWishlist(
  userId: string,
  productId: string,
) {
  return prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
  });
}

export async function removeFromWishlist(
  userId: string,
  productId: string,
) {
  return prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}