import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/routes";
import type { ProductApiRecord } from "@/types/product";
import type { ApiListResponse } from "@/lib/api/utils";

export const productService = {
  list() {
    return apiFetch<ApiListResponse<ProductApiRecord>>(API_ROUTES.products);
  },

  detail(id: string) {
    return apiFetch<ProductApiRecord>(`${API_ROUTES.products}/${id}`);
  },
};
