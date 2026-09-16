import type { Product } from "../types/Product"

export const products: Product[] = [
  {
    id: "air-runner",
    name: "Air Runner",
    price: 180,
    image: "../src/assets/products/air-runner.png",
    category: "Running",
    badge: "New",
  },
  {
    id: "street-one",
    name: "Street One",
    price: 165,
    image: "../src/assets/products/street-one.png",
    category: "Streetwear",
    badge: "Trending",
  },
  {
    id: "flux-01",
    name: "Flux 01",
    price: 195,
    image: "../src/assets/products/flux-01.png",
    category: "Lifestyle",
  },
  {
    id: "motion-x",
    name: "Motion X",
    price: 210,
    image: "../src/assets/products/motion-x.png",
    category: "Performance",
    badge: "Limited",
  },
]