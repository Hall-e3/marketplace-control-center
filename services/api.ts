import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    const message =
      error.response?.data?.detail || error.message || "An error occurred";
    toast.error(message);

    return Promise.reject(error);
  },
);

export const tokenConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem("access_token");
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
};
