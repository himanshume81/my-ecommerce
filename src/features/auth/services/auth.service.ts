import { API_ROUTES } from "@/lib/api/routes";
import { getTokens, type TokenPayload } from "@/lib/api/auth-tokens";
import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
} from "@/lib/api/token-storage";

export type LoginPayload = {
  email: string;
  password: string;
  userType: "user";
};

export type RegisterPayload = {
  name?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: "user";
  status: "active";
};

export const authService = {
  async login(payload: LoginPayload) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured");
      }

      const response = await fetch(`${apiUrl}${API_ROUTES.auth.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (response.ok) {
        const payload = (await response.clone().json()) as TokenPayload;
        const tokens = getTokens(payload);

        if (tokens.accessToken && tokens.refreshToken) {
          setStoredTokens({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        }
      }

      return response;
    } finally {
      window.clearTimeout(timeout);
    }
  },

  register(payload: RegisterPayload) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    return fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  logout() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const accessToken = getStoredTokens()?.accessToken;

    clearStoredTokens();

    if (!apiUrl) {
      return Promise.resolve(new Response(null, { status: 204 }));
    }

    return fetch(`${apiUrl}${API_ROUTES.auth.logout}`, {
      method: "POST",
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    }).catch(() => new Response(null, { status: 204 }));
  },
};
