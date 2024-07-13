/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'

import { IOrder } from './order.interface'
import { Order } from './order.model'

const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.create(payload)
  return result
}

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id)
  return result
}
const getAllOrdersFromDB = async () => {
  const result = await Order.find()
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

// delete room(softDelete) from db
const deleteOrderFromDB = async (id: string) => {
  const order = await Order.isOrderExists(id)
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!')
  }
  const isDeletedOrder = order.isDeleted
  if (isDeletedOrder) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order already deleted!')
  }

  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const OrderServices = {
  createOrderIntoDB,
  getSingleOrderFromDB,
  getAllOrdersFromDB,
  //   updateRoomIntoDB,
  deleteOrderFromDB,
}
