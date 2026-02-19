import { api } from "./api";
import { CreateProductData, Product } from "@/lib/types";

const PRODUCTS_URL = "/products";

export const productsService = {
  getProducts: async () => {
    const response = await api.get<Product[]>(`${PRODUCTS_URL}/`);
    return response.data;
  },

  getPublicProducts: async () => {
    const response = await api.get<Product[]>(`${PRODUCTS_URL}/public/`);
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await api.get<Product>(`${PRODUCTS_URL}/${id}/`);
    return response.data;
  },

  createProduct: async (data: CreateProductData) => {
    const response = await api.post<Product>(`${PRODUCTS_URL}/`, data);
    return response.data;
  },

  updateProduct: async (id: string, data: Partial<CreateProductData>) => {
    const response = await api.put<Product>(`${PRODUCTS_URL}/${id}/`, data);
    return response.data;
  },

  approveProduct: async (id: string) => {
    const response = await api.post<Product>(`${PRODUCTS_URL}/${id}/approve/`);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    await api.delete(`${PRODUCTS_URL}/${id}/`);
  },
};
