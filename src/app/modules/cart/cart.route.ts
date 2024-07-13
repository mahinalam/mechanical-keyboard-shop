import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CartController } from './cart.controller'

const router = express.Router()

router.post('/create-cart', CartController.createCart)
router.get('/', CartController.getAllCarts)
router.get('/:id', CartController.getSingleCart)
router.delete('/:id', CartController.deleteCart)

export const CartRoutes = router
