import { api } from "./api";
import { CreateProductData, Product } from "@/lib/types";

const PRODUCTS_URL = "/api/v1/products";

export const productsService = {
  getProducts: async () => {
    const response = await api.get<{ products: Product[] }>(`${PRODUCTS_URL}/`);
    return response.data.products;
  },

  getPublicProducts: async () => {
    const response = await api.get<{ products: Product[] }>(
      `${PRODUCTS_URL}/public/`,
    );
    return response.data.products;
  },

  getProduct: async (id: string) => {
    const response = await api.get<{ product: Product }>(
      `${PRODUCTS_URL}/${id}/`,
    );
    return response.data.product;
  },

  createProduct: async (data: CreateProductData) => {
    const response = await api.post<{ product: Product }>(
      `${PRODUCTS_URL}/`,
      data,
    );
    return response.data.product;
  },

  updateProduct: async (id: string, data: Partial<CreateProductData>) => {
    const response = await api.put<{ product: Product }>(
      `${PRODUCTS_URL}/${id}/`,
      data,
    );
    return response.data.product;
  },

  approveProduct: async (id: string) => {
    const response = await api.post<{ product: Product }>(
      `${PRODUCTS_URL}/${id}/approve/`,
    );
    return response.data.product;
  },

  deleteProduct: async (id: string) => {
    await api.delete(`${PRODUCTS_URL}/${id}/`);
  },
};
