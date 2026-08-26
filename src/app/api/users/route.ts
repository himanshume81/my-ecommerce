import { NextResponse } from "next/server";
import { API_ROUTES } from "@/lib/api/routes";

export async function POST(request: Request) { const upstream = process.env.API_URL?.replace(/\/$/, ""); if (!upstream) return NextResponse.json({ message: "API_URL is not configured" }, { status: 503 }); const response = await fetch(`${upstream}${API_ROUTES.users}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(await request.json()) }); return NextResponse.json(await response.json(), { status: response.status }); }
