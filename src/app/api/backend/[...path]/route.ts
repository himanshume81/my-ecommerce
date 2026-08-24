import { NextRequest, NextResponse } from "next/server";

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { const upstream = process.env.API_URL; if (!upstream) return NextResponse.json({ message: "API_URL is not configured" }, { status: 503 }); const { path } = await context.params; const headers = new Headers(request.headers); const accessToken = request.cookies.get("accessToken")?.value; if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`); headers.delete("host"); const response = await fetch(`${upstream}/${path.join("/")}${request.nextUrl.search}`, { method: request.method, headers, body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.text() }); return new NextResponse(response.body, { status: response.status, headers: response.headers }); }
export const GET = forward;
export const POST = forward;
export const PATCH = forward;