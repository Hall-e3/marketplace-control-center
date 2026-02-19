import { z } from "zod";

export const roleTypeSchema = z.enum(["admin", "editor", "approver", "viewer"]);

export const roleSchema = z.object({
  name: roleTypeSchema,
  can_create_product: z.boolean().default(false),
  can_edit_product: z.boolean().default(false),
  can_approve_product: z.boolean().default(false),
  can_delete_product: z.boolean().default(false),
});

export const businessSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Business name must be at least 2 characters"),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  business: businessSchema.optional(),
  role: roleSchema.optional(),
  avatar: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    re_password: z.string(),
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    business_name: z
      .string()
      .min(2, "Business name must be at least 2 characters"),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export type RoleType = z.infer<typeof roleTypeSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Business = z.infer<typeof businessSchema>;
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
