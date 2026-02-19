import { api } from "./api";
import { LoginCredentials, RegisterData } from "@/lib/types";

const AUTH_URL = "/auth";
export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(`${AUTH_URL}/jwt/create/`, credentials);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post(`${AUTH_URL}/users/`, data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get(`${AUTH_URL}/users/me/`);
    return response.data;
  },

  refreshToken: async (refresh: string) => {
    const response = await api.post(`${AUTH_URL}/jwt/refresh/`, { refresh });
    return response.data;
  },
};
