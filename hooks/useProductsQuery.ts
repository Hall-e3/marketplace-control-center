import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";
import { CreateProductData, UpdateProductData, Product } from "@/lib/types";
import { toast } from "sonner";
import { useApp } from "./useApp";

export function useProductsQuery() {
  const queryClient = useQueryClient();
  const { setAppLoading } = useApp();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productsService.getProducts,
  });

  const createProduct = useMutation({
    mutationFn: (data: CreateProductData) =>
      productsService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create product");
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) =>
      productsService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete product");
    },
  });

  const approveProduct = useMutation({
    mutationFn: (id: string) => productsService.approveProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product approved successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to approve product");
    },
  });

  return {
    products,
    isLoading,
    isError,
    createProduct,
    updateProduct,
    deleteProduct,
    approveProduct,
  };
}
