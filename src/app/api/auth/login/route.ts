import { NextResponse } from "next/server";
import { getAuthCookieOptions, getTokens, type TokenPayload } from "@/lib/api/auth-tokens";
import { API_ROUTES } from "@/lib/api/routes";

export async function POST(request: Request) {
	const upstream = process.env.API_URL?.replace(/\/$/, "");
	if (!upstream) return NextResponse.json({ message: "API_URL is not configured" }, { status: 503 });
	try {
		const input = await request.json() as { email?: string; password?: string };
		const response = await fetch(`${upstream}${API_ROUTES.auth.login}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: input.email, password: input.password, userType: "user" }) });
		if (!response.ok) {
			const error = await response.json().catch(() => ({})) as { message?: string };
			return NextResponse.json({ message: error.message ?? "Unable to sign in" }, { status: response.status });
		}
		const payload = await response.json() as TokenPayload;
		const { accessToken, refreshToken } = getTokens(payload);
		if (!accessToken || !refreshToken) return NextResponse.json({ message: "Login response is missing tokens" }, { status: 502 });
		const result = NextResponse.json({ ok: true });
		result.cookies.set("accessToken", accessToken, getAuthCookieOptions(900));
		result.cookies.set("refreshToken", refreshToken, getAuthCookieOptions(60 * 60 * 24 * 30));
		return result;
	} catch {
		return NextResponse.json({ message: "Unable to reach the authentication service" }, { status: 502 });
	}
}
