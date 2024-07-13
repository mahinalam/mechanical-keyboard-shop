import { z } from 'zod'

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string().trim(),
    image: z.string().trim().optional(),
    brand: z.string().trim(),
    availableQuantity: z.number(),
    price: z.number(),
    rating: z.number(),
    isDeleted: z.boolean().optional(),
  }),
})
const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    image: z.number().optional(),
    brand: z.number().optional(),
    availableQuantity: z.number().optional(),
    price: z.number().optional(),
    rating: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
    inStock: z.boolean().optional(),
  }),
})

export const ProductValidationSchema = {
  createProductValidationSchema,
  updateProductValidationSchema,
}
