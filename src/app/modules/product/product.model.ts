import { Schema, model } from 'mongoose'
import { IProduct, ProductModel } from './product.interface'

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
    },
    image: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)
// check if product exists
productSchema.statics.isProductExists = async function (
  id: string,
): Promise<IProduct | null> {
  const isProductExists = await Product.findById(id)
  return isProductExists
}

productSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})
export const Product = model<IProduct, ProductModel>('Product', productSchema)
