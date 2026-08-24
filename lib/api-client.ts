export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function refreshSession() {
  const response = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
  return response.ok;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  const response = await fetch(`/api/backend${path}`, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...init.headers } });
  if (response.status === 401 && !retried && await refreshSession()) return apiFetch<T>(path, init, true);
  if (!response.ok) throw new ApiError(response.status, await response.text() || "Request failed");
  return response.status === 204 ? (undefined as T) : response.json();
}

export const authService = {
  login: (payload: { email: string; password: string; userType: "user" }) => fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
  logout: () => fetch("/api/auth/logout", { method: "POST" }),
};
export const userService = { update: <T>(id: string, payload: T) => apiFetch(`/users/${id}`, { method: "PATCH", body: JSON.stringify(payload) }) };
export const productService = { list: <T>() => apiFetch<T>("/products"), detail: <T>(id: string) => apiFetch<T>(`/products/${id}`) };
export const orderService = { list: <T>(page: number, limit: number) => apiFetch<T>(`/orders?page=${page}&limit=${limit}`), create: <T>(items: unknown[], key: string) => apiFetch<T>("/orders", { method: "POST", headers: { "Idempotency-Key": key }, body: JSON.stringify({ items }) }) };
