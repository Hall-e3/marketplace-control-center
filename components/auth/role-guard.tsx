"use client";

import { useAuth } from "@/hooks/useAuth";
import { RoleType } from "@/lib/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: RoleType[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { role } = useAuth();
  const currentRole = role?.toLowerCase() as RoleType;

  if (!allowedRoles.includes(currentRole)) {
    return null;
  }

  return <>{children}</>;
}
