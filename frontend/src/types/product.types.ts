export interface IProduct {
  id: number 
  name: string
  salePrice: number | null
  price: number
  countAvailable: number
  image: string
  imagesUrl?: string[]
  description: string
  category?: string
}
export interface IProductDto{
  name: string
  salePrice: number | null
  price: number
  countAvailable: number
  imagesUrl?: string[]
  description: string
  category?: string
}