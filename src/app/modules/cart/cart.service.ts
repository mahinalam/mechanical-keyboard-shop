/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { ICart } from './cart.interface'
import { Cart } from './cart.model'

const createCartIntoDB = async (payload: ICart) => {
  // check if the product exists

  // const room = await Room.isRoomExists(payload.name)

  const result = await Cart.create(payload)
  return result
}

const getSingleCartFromDB = async (id: string) => {
  const result = await Cart.findById(id)
  return result
}
const getAllCartsFromDB = async () => {
  const result = await Cart.find()
  return result
}

// const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
//   // check if the room exists
//   const product = await Product.isProductExists(id)
//   if (!product) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
//   }
//   const isDeletedProduct = product?.isDeleted
//   if (isDeletedProduct) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Product already deleted!')
//   }

//   const updateOperations = {}

//   // Build the update operations dynamically
//   for (const key in payload) {
//     if (key === 'amenities' && Array.isArray(payload[key])) {
//       (updateOperations as any).$addToSet =
//         (updateOperations as any).$addToSet || {}
//       ;(updateOperations as any).$addToSet[key] = { $each: payload[key] }
//     } else {
//       (updateOperations as any).$set = (updateOperations as any).$set || {}
//       ;(updateOperations as any).$set[key] = (payload as any)[key]
//     }
//   }

//   // Update the room document
//   const updatedRoom = await Room.findByIdAndUpdate(id, updateOperations, {
//     new: true,
//   })

//   return updatedRoom
// }

// delete cart(softDelete) from db
const deleteCartFromDB = async (id: string) => {
  const cart = await Cart.isCartExists(id)
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found!')
  }
  const isDeleteCart = cart.isDeleted
  if (isDeleteCart) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cart already deleted!')
  }

  const result = await Cart.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const CartServices = {
  createCartIntoDB,
  getSingleCartFromDB,
  getAllCartsFromDB,
  //   updateRoomIntoDB,
  deleteCartFromDB,
}
