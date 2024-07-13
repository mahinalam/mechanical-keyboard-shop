import { Model } from 'mongoose'

export interface IProduct {
  title: string
  image?: string
  brand: string
  availableQuantity: number
  price: number
  rating: number
  description: string
  isDeleted: boolean
}

export interface ProductModel extends Model<IProduct> {
  isProductExists(id: string): Promise<IProduct>
  isProductDeleted(): Promise<IProduct | null>
}
