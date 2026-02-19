"use client";

import { useAuth } from "@/hooks/useAuth";
import { RoleType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RoleTester() {
  const { user, getRole, role: currentRole } = useAuth();

  if (!user) return null;

  const roles: RoleType[] = ["admin", "editor", "approver", "viewer"];

  const handleRoleChange = (role: RoleType) => {
    getRole(role);
  };

  return (
    <Card className="p-4 border border-border/50 bg-muted/30">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            Test Different Roles:
          </p>
          <Badge>{currentRole}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Button
              key={role}
              size="sm"
              variant={currentRole === role ? "default" : "outline"}
              onClick={() => handleRoleChange(role)}
              className="text-xs capitalize"
            >
              {role}
            </Button>
          ))}
        </div>
        <p className="text-xs text-foreground/60">
          Change roles to see the sidebar update and access control in action.
          Try switching to Admin to see the Users page.
        </p>
      </div>
    </Card>
  );
}
