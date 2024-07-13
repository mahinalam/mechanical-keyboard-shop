import { ObjectId } from 'mongoose'

export interface ICartItem {
  cart: ObjectId
  product: ObjectId
  quantity: number
  price: number
  addedAt: Date
  isDeleted: boolean
}
