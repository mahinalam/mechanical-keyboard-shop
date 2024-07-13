import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserValidationSchema } from './user.validation'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserController.createUser,
)
router.post(
  '/login',
  validateRequest(UserValidationSchema.loginValidationSchema),
  UserController.loginUser,
)

export const userRoutes = router
