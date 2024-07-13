import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { ProductServices } from './product.service'
// create product
const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const product = req.body
  console.log('product', product)
  const result = await ProductServices.createProductIntoDB(product)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Product Created successfully',
    data: result,
  })
})

// get single product
const getSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ProductServices.getSingleProductFromDB(id)
  //TODO
  if (!result) {
    return sendResponse(res, {
      statusCodeNumber: httpStatus.NOT_FOUND,
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    })
  }
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully',
    data: result,
  })
})
// get all products
const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB()
  //TODO
  if (result.length === 0) {
    return sendResponse(res, {
      statusCodeNumber: httpStatus.NOT_FOUND,
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    })
  }
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    data: result,
  })
})

// // update product
const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  console.log(payload, id)
  const result = await ProductServices.updateProductIntoDB(id, payload)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Product updated successfully',
    data: result,
  })
})

// delete product
const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ProductServices.deleteProductFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  })
})

export const ProductController = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
}
