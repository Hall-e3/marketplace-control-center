"use client";

import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, CheckCircle, Loader2, Package } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProductStatus } from "@/schemas/product.schema";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onEdit: (id: string) => void;
  loading?: boolean;
}

export function ProductTable({
  products,
  onDelete,
  onApprove,
  onEdit,
  loading = false,
}: ProductTableProps) {
  const { user, isAdmin, isApprover } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const canApprove = isAdmin || isApprover;

  const getStatusBadge = (status: ProductStatus) => {
    const variants: Record<ProductStatus, { variant: any; label: string }> = {
      draft: { variant: "secondary", label: "Draft" },
      pending_approval: { variant: "outline", label: "Pending Approval" },
      approved: { variant: "default", label: "Approved" },
    };

    const { variant, label } = variants[status];
    return (
      <Badge variant={variant} className="capitalize">
        {label}
      </Badge>
    );
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    onDelete(id);
    setTimeout(() => setDeletingId(null), 500);
  };

  const handleApprove = (id: string) => {
    setApprovingId(id);
    onApprove(id);
    setTimeout(() => setApprovingId(null), 500);
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-muted mb-4 flex items-center justify-center">
          <Package className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          No products yet
        </h3>
        <p className="text-sm text-foreground/60">
          Create your first product to get started
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-foreground font-semibold">
              Name
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Description
            </TableHead>
            <TableHead className="text-right text-foreground font-semibold">
              Price
            </TableHead>
            <TableHead className="text-center text-foreground font-semibold">
              Status
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Created By
            </TableHead>
            <TableHead className="text-right text-foreground font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="hover:bg-muted/30 border-border/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">
                {product?.name}
              </TableCell>
              <TableCell className="text-foreground/70 text-sm max-w-xs truncate">
                {product?.description}
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                ${product?.price}
              </TableCell>
              <TableCell className="text-center">
                {getStatusBadge(product?.status)}
              </TableCell>
              <TableCell className="text-foreground/60 text-sm">
                {product?.created_by?.first_name ||
                  product?.created_by?.email ||
                  "Unknown"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit {product?.name}</span>
                  </Button>

                  {canApprove && product?.status !== "approved" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(product.id)}
                      disabled={approvingId === product.id || loading}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30"
                    >
                      {approvingId === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span className="sr-only">Approve {product?.name}</span>
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete {product?.name}</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product?.name}"?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex gap-2 justify-end">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product?.id)}
                          disabled={deletingId === product?.id || loading}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {deletingId === product?.id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
