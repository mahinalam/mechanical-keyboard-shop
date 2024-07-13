import { z } from 'zod'

const OrderItemValidationSchema = z.object({
  product: z.string(), // Assuming ObjectId is a string
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  price: z.number().min(0, { message: 'Price must be at least 0' }),
})

export const createOrderValidationSchema = z.object({
  user: z.string(), // Assuming ObjectId is a string
  items: z.array(OrderItemValidationSchema),
  shippingAddress: z.object({
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    postalCode: z.string().min(1, { message: 'Postal Code is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
  paymentDetails: z.object({
    method: z.string().min(1, { message: 'Payment method is required' }),
    transactionId: z.string().min(1, { message: 'Transaction ID is required' }),
  }),
  status: z
    .enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .default('pending'),
  totalAmount: z
    .number()
    .min(0, { message: 'Total amount must be at least 0' }),
  isDeleted: z.boolean().default(false),
})

export const OrderValidationSchema = {
  createOrderValidationSchema,
}
