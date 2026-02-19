import { z } from "zod";

export const productStatusSchema = z.enum([
  "draft",
  "pending_approval",
  "approved",
]);

export const createdBySchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.string(),
  status: productStatusSchema,
  created_by: createdBySchema.optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  business_name: z.string().optional(),
  created_by_name: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(255, "Product name must not exceed 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .max(999999.99, "Price is too high"),
});

export const updateProductSchema = createProductSchema.partial();

// Infer TypeScript types
export type ProductStatus = z.infer<typeof productStatusSchema>;
export type Product = z.infer<typeof productSchema>;
export type CreateProductData = z.infer<typeof createProductSchema>;
export type UpdateProductData = z.infer<typeof updateProductSchema>;
