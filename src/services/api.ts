import { BFF_ROUTES } from "@/constants/apiUrl";
import type { Category, Product, ProductApiRecord } from "@/types/product";

type ApiListResponse<T> = T[] | { data?: T[]; items?: T[] };

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function refreshSession() {
  const response = await fetch(BFF_ROUTES.refresh, { method: "POST", credentials: "include" });
  return response.ok;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  const baseUrl = typeof window === "undefined" ? process.env.API_URL : BFF_ROUTES.backend;
  if (!baseUrl) throw new ApiError(503, "API_URL is not configured");
  const response = await fetch(`${baseUrl}${path}`, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...init.headers } });
  if (response.status === 401 && !retried && typeof window !== "undefined" && await refreshSession()) return apiFetch<T>(path, init, true);
  if (!response.ok) throw new ApiError(response.status, await response.text() || "Request failed");
  return response.status === 204 ? (undefined as T) : response.json();
}

export const authService = {
  login: async (payload: { email: string; password: string; userType: "user" }) => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      return await fetch(BFF_ROUTES.login, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller.signal });
    } finally {
      window.clearTimeout(timeout);
    }
  },
  logout: () => fetch(BFF_ROUTES.logout, { method: "POST", credentials: "include" }),
};
export const userService = { update: <T>(id: string, payload: T) => apiFetch(`/users/${id}`, { method: "PATCH", body: JSON.stringify(payload) }) };
export const productService = {
  list: () => apiFetch<ApiListResponse<ProductApiRecord>>("/products"),
  detail: (id: string) => apiFetch<ProductApiRecord>(`/products/${id}`),
};
export const categoryService = {
  list: () => apiFetch<ApiListResponse<Category>>("/categories"),
};
export const orderService = { list: <T>(page: number, limit: number) => apiFetch<T>(`/orders?page=${page}&limit=${limit}`), create: <T>(items: unknown[], key: string) => apiFetch<T>("/orders", { method: "POST", headers: { "Idempotency-Key": key }, body: JSON.stringify({ items }) }) };
