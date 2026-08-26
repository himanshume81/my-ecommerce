export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  users: "/users",
  products: "/products",
  categories: "/categories",
  orders: "/orders",
} as const;

export const BFF_ROUTES = {
  backend: "/api/backend",
  login: "/api/auth/login",
  refresh: "/api/auth/refresh",
  logout: "/api/auth/logout",
  users: "/api/users",
} as const;
