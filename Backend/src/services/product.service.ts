import { prisma } from "../lib/prisma.js";

export async function findAllProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findProductById(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
}