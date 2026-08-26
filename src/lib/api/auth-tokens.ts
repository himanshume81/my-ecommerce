type TokenRecord = {
  accessToken?: string;
  refreshToken?: string;
  access_token?: string;
  refresh_token?: string;
};

export type TokenPayload = TokenRecord & {
  data?: TokenRecord;
};

export function getTokens(payload: TokenPayload) {
  const tokens = payload.data ?? payload;

  return {
    accessToken: tokens.accessToken ?? tokens.access_token,
    refreshToken: tokens.refreshToken ?? tokens.refresh_token,
  };
}

export function getAuthCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}
