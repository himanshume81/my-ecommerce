import { ApiError } from "@/lib/api/errors";
import { API_ROUTES } from "@/lib/api/routes";
import { getTokens, type TokenPayload } from "@/lib/api/auth-tokens";
import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
} from "@/lib/api/token-storage";

let refreshPromise: Promise<boolean> | null = null;

function getClientApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}

async function refreshSession() {
  if (!refreshPromise) {
    const tokens = getStoredTokens();
    const apiUrl = getClientApiUrl();

    if (!tokens?.refreshToken || !apiUrl) {
      return false;
    }

    refreshPromise = fetch(`${apiUrl}${API_ROUTES.auth.refresh}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          clearStoredTokens();
          return false;
        }

        const payload = (await response.json()) as TokenPayload;
        const nextTokens = getTokens(payload);

        if (!nextTokens.accessToken) {
          clearStoredTokens();
          return false;
        }

        setStoredTokens({
          accessToken: nextTokens.accessToken,
          refreshToken: nextTokens.refreshToken ?? tokens.refreshToken,
        });

        return true;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function parseErrorPayload(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => undefined);
  }

  return response.text().catch(() => undefined);
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  retried = false,
): Promise<T> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.API_URL
      : getClientApiUrl();

  if (!baseUrl) {
    throw new ApiError(503, "API_URL is not configured");
  }

  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    const tokens = getStoredTokens();

    if (tokens?.accessToken) {
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });

  if (
    response.status === 401 &&
    !retried &&
    typeof window !== "undefined" &&
    (await refreshSession())
  ) {
    return apiFetch<T>(path, init, true);
  }

  if (!response.ok) {
    const payload = await parseErrorPayload(response);
    const message =
      typeof payload === "string"
        ? payload || "Request failed"
        : payload && typeof payload === "object" && "message" in payload
          ? String(payload.message)
          : "Request failed";

    throw new ApiError(response.status, message, payload);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
