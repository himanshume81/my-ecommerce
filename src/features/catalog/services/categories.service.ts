import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/routes";
import type { Category } from "@/types/product";
import type { ApiListResponse } from "@/lib/api/utils";

export const categoryService = {
  list() {
    return apiFetch<ApiListResponse<Category>>(API_ROUTES.categories);
  },
};
