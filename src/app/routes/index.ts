import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { ProductRoutes } from '../modules/product/product.route'
import { OrderRoutes } from '../modules/order/order.route'
import { CartRoutes } from '../modules/cart/cart.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/products',
    element: ProductRoutes,
  },
  {
    path: '/orders',
    element: OrderRoutes,
  },
  {
    path: '/carts',
    element: CartRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
