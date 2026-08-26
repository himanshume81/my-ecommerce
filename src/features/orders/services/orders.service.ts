import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/routes";

export const orderService = {
  list<T>(page: number, limit: number) {
    return apiFetch<T>(`${API_ROUTES.orders}?page=${page}&limit=${limit}`);
  },

  create<T>(items: unknown[], key: string) {
    return apiFetch<T>(API_ROUTES.orders, {
      method: "POST",
      headers: { "Idempotency-Key": key },
      body: JSON.stringify({ items }),
    });
  },
};
