import { Model, ObjectId } from 'mongoose'

export interface IOrderItem {
  product: ObjectId
  quantity: number
  price: number
}

export interface IOrder {
  user: ObjectId
  items: IOrderItem[]
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  paymentDetails: {
    method: string
    transactionId: string
  }
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  isDeleted: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderModel extends Model<IOrder> {
  isOrderExists(id: string): Promise<IOrder>
  isOrderDeleted(): Promise<IOrder | null>
}
