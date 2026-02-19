import { z } from "zod";
import { RoleTypeEnum } from "@/types/enum";
import {
  userSchema,
  loginSchema,
  registerSchema,
  roleSchema,
} from "@/schemas/auth.schema";
import {
  productSchema,
  createProductSchema,
  updateProductSchema,
} from "@/schemas/product.schema";

export type RoleType = z.infer<typeof RoleTypeEnum>;
export type Role = z.infer<typeof roleSchema>;
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export type Product = z.infer<typeof productSchema>;
export type CreateProductData = z.infer<typeof createProductSchema>;
export type UpdateProductData = z.infer<typeof updateProductSchema>;

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  requiredRole?: RoleType;
}
