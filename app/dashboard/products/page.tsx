"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Check, Trash, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { products, isLoading, approveProduct, deleteProduct } =
    useProductsQuery();

  const handleApprove = (id: string) => {
    approveProduct.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    deleteProduct.mutate(id);
  };

  const canCreate =
    user?.role?.can_create_product ||
    user?.role?.name === "admin" ||
    user?.role?.name === "editor";

  const canApprove =
    user?.role?.can_approve_product ||
    user?.role?.name === "admin" ||
    user?.role?.name === "approver";

  const canDelete =
    user?.role?.can_delete_product || user?.role?.name === "admin";

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        {canCreate && (
          <Button onClick={() => router.push("/dashboard/products/new")}>
            <Plus className="mr-2 h-4 w-4" /> Create Product
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{product.name}</CardTitle>
                <Badge
                  variant={
                    product.status === "approved"
                      ? "default"
                      : product.status === "pending_approval"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {product.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              <p className="font-bold text-lg">${product.price}</p>
              <div className="text-xs text-muted-foreground mt-2">
                <p>Business: {product.business_name}</p>
                <p>Created by: {product.created_by_name}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {canApprove && product.status === "pending_approval" && (
                <Button size="sm" onClick={() => handleApprove(product.id)}>
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
              )}
              {canDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
