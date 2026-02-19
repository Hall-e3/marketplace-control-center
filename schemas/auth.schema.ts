import { z } from "zod";
import { RoleTypeEnum } from "@/types/enum";

export const roleSchema = z.object({
  name: RoleTypeEnum,
  can_create_product: z.boolean().default(false),
  can_edit_product: z.boolean().default(false),
  can_approve_product: z.boolean().default(false),
  can_delete_product: z.boolean().default(false),
});

export const businessSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(2, "Business name is too short")
    .max(100, "Business name is too long"),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email("Please enter a valid email"),
  first_name: z.string().min(2, "First name is too short").optional(),
  last_name: z.string().min(2, "Last name is too short").optional(),
  business: businessSchema.optional(),
  role: roleSchema.optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number")
      .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
    re_password: z.string().min(1, "Please confirm your password"),
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long"),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long"),
    business_name: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(100, "Business name is too long"),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export type Role = z.infer<typeof roleSchema>;
export type Business = z.infer<typeof businessSchema>;
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
