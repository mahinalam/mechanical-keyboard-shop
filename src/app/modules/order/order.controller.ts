import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { OrderServices } from './order.service'
const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const order = req.body
  console.log('order', order)
  const result = await OrderServices.createOrderIntoDB(order)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Order Created successfully',
    data: result,
  })
})

// get single order
const getSingleOrder: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await OrderServices.getSingleOrderFromDB(id)
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
    message: 'Order retrieved successfully',
    data: result,
  })
})
// get all orders
const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB()
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
    message: 'Orders retrieved successfully',
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

// delete order
const deleteOrder: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await OrderServices.deleteOrderFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Order deleted successfully',
    data: result,
  })
})

export const OrderController = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  deleteOrder,
}
