import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const upstream = process.env.API_URL?.replace(/\/$/, "");
	if (!upstream) return NextResponse.json({ message: "API_URL is not configured" }, { status: 503 });
	try {
		const input = await request.json() as { email?: string; password?: string };
		const response = await fetch(`${upstream}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: input.email, password: input.password, userType: "user" }) });
		if (!response.ok) {
			const error = await response.json().catch(() => ({})) as { message?: string };
			return NextResponse.json({ message: error.message ?? "Unable to sign in" }, { status: response.status });
		}
		const tokens = await response.json();
		if (!tokens.accessToken || !tokens.refreshToken) return NextResponse.json({ message: "Login response is missing tokens" }, { status: 502 });
		const secure = process.env.NODE_ENV === "production";
		const result = NextResponse.json({ ok: true });
		result.cookies.set("accessToken", tokens.accessToken, { httpOnly: true, secure, sameSite: "lax", maxAge: 900, path: "/" });
		result.cookies.set("refreshToken", tokens.refreshToken, { httpOnly: true, secure, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
		return result;
	} catch {
		return NextResponse.json({ message: "Unable to reach the authentication service" }, { status: 502 });
	}
}
