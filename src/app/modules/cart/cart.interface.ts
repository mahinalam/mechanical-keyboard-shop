import { Model } from 'mongoose'
import { ObjectId } from 'mongoose'

export interface ICart {
  user: ObjectId
  status: ['active', 'ordered']
  items: [ObjectId]
  isDeleted: boolean
}

export interface CartModel extends Model<ICart> {
  isCartExists(id: string): Promise<ICart | null>
  isCartDeleted(): Promise<ICart | null>
}
