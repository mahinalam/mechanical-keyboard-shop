import z from 'zod'
const CartItemSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
})
const CartSchema = z.object({
  body: z.object({
    user: z.string(),
    status: z.enum(['active', 'ordered']),
    items: z.array(CartItemSchema),
  }),
})
