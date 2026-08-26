import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/routes";

export const userService = {
  update<T>(id: string, payload: T) {
    return apiFetch(`${API_ROUTES.users}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
