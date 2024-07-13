/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { IProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (payload: IProduct) => {
  // check if the product exists
  const product = await Product.findOne({ title: payload?.title })
  // const room = await Room.isRoomExists(payload.name)
  if (product) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product already exists')
  }
  const result = await Product.create(payload)
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
  return result
}
const getAllProductsFromDB = async () => {
  const result = await Product.find().sort({ createdAt: -1 })
  return result
}

const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  // check if the product exists
  const product = await Product.isProductExists(id)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
  }
  const isDeletedProduct = product?.isDeleted
  if (isDeletedProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product already deleted!')
  }
  const newproduct = payload

  // Update the product document
  const updatedProduct = await Product.findByIdAndUpdate(id, newproduct, {
    new: true,
  })

  return updatedProduct
}

// delete room(softDelete) from db
const deleteProductFromDB = async (id: string) => {
  const product = await Product.isProductExists(id)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
  }
  const isDeletedProduct = product.isDeleted
  if (isDeletedProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product already deleted!')
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
