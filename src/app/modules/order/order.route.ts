import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { OrderValidationSchema } from './order.validation'
import { OrderController } from './order.controller'

const router = express.Router()

router.post(
  '/create-order',
  validateRequest(OrderValidationSchema.createOrderValidationSchema),
  OrderController.createOrder,
)
router.get('/', OrderController.getAllOrders)

export const OrderRoutes = router
