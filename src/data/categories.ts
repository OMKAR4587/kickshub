export type Category = {
  id: string
  name: string
  description: string
  image: string
}

export const categories: Category[] = [
  {
    id: "running",
    name: "Running",
    description: "Built for every stride.",
    image: "/src/assets/categories/running.webp",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Everyday comfort.",
    image: "/src/assets/categories/lifestyle.webp",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Made for the streets.",
    image: "/src/assets/categories/streetwear.webp",
  },
  {
    id: "performance",
    name: "Performance",
    description: "Push your limits.",
    image: "/src/assets/categories/performance.webp",
  },
]