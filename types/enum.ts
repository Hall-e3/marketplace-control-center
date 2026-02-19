import { z } from "zod";

export enum RoleType {
  ADMIN = "admin",
  EDITOR = "editor",
  APPROVER = "approver",
  VIEWER = "viewer",
}

export const RoleTypeEnum = z.enum(["admin", "editor", "approver", "viewer"]);

export enum ProductStatus {
  DRAFT = "draft",
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
}

export const ProductStatusEnum = z.enum([
  "draft",
  "pending_approval",
  "approved",
]);
