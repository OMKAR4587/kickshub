import type { Product } from "../types/Product"

export const products: Product[] = [
  {
    id: "air-runner",
    name: "Air Runner",
    price: 180,
    image: "/src/assets/products/air-runner.png",
    category: "Running",
    badge: "New",
    description:
      "A lightweight performance sneaker built for everyday movement and comfortable long-distance runs.",
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
    isNew: true,
  },
  {
    id: "street-one",
    name: "Street One",
    price: 165,
    image: "/src/assets/products/street-one.png",
    category: "Streetwear",
    badge: "Trending",
    description:
      "A bold streetwear silhouette designed for everyday style, comfort, and effortless rotation.",
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
    isNew: true,
  },
  {
    id: "flux-01",
    name: "Flux 01",
    price: 195,
    image: "/src/assets/products/flux-01.png",
    category: "Lifestyle",
    description:
      "A versatile lifestyle sneaker combining modern design with all-day comfort.",
    sizes: [8, 9, 10, 11],
    inStock: true,
    isNew: false,
  },
  {
    id: "motion-x",
    name: "Motion X",
    price: 210,
    image: "/src/assets/products/motion-x.png",
    category: "Performance",
    badge: "Limited",
    description:
      "Engineered for high-energy movement with a responsive feel and distinctive performance design.",
    sizes: [8, 9, 10],
    inStock: true,
    isNew: false,
  },
]