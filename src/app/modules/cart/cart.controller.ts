import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { ProductServices } from './product.service'
import { CartServices } from './cart.service'
// create Cart
const createCart: RequestHandler = catchAsync(async (req, res) => {
  const cart = req.body

  const result = await CartServices.createCartIntoDB(cart)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Cart Added successfully',
    data: result,
  })
})

// get single cart
const getSingleCart: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CartServices.getSingleCartFromDB(id)
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
    message: 'Cart retrieved successfully',
    data: result,
  })
})
// get all carts
const getAllCarts: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartServices.getAllCartsFromDB()
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
    message: 'Carts retrieved successfully',
    data: result,
  })
})

// // update room
// const updateRoom: RequestHandler = catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const payload = req.body;

//      const result = await RoomServices.updateRoomIntoDB(id, payload)
//     sendResponse(res, {
//       statusCodeNumber: httpStatus.OK,
//       success: true,
//       statusCode: 200,
//       message: 'Room updated successfully',
//       data: result,
//     })
//   })

// delete product
const deleteCart: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CartServices.deleteCartFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Cart deleted successfully',
    data: result,
  })
})

export const CartController = {
  createCart,
  getSingleCart,
  getAllCarts,
  //   updateProduct,
  deleteCart,
}
