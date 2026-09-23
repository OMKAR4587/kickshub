import { products } from "../data/product.js";

export function findAllProducts() {
  return products;
}

export function findProductById(id: string) {
  return products.find((product) => product.id === id);
}