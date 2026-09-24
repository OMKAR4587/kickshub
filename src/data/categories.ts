import airRunnerImg from "../assets/products/air-runner.png"
import streetOneImg from "../assets/products/street-one.png"
import fluxImg from "../assets/products/flux-01.png"
import motionImg from "../assets/products/motion-x.png"

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
    image: airRunnerImg,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Everyday comfort.",
    image: streetOneImg,
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Made for the streets.",
    image: fluxImg,
  },
  {
    id: "performance",
    name: "Performance",
    description: "Push your limits.",
    image: motionImg,
  },
]