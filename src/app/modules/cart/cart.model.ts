import mongoose from 'mongoose'
import { CartModel, ICart } from './cart.interface'
const { Schema } = mongoose

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'ordered'],
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartItem',
        required: true,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
)

// check if cart exists
CartSchema.statics.isCartExists = async function (
  id: string,
): Promise<ICart | null> {
  const isCartExists = await Cart.findById(id)
  return isCartExists
}

export const Cart = mongoose.model<ICart, CartModel>('Cart', CartSchema)
