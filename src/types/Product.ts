export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  badge?: string
  description: string
  sizes: number[]
  inStock: boolean
  isNew: boolean
}