"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/common/page-shell";
import { OrderCard } from "@/components/molecules/order-card";
import { Pagination } from "@/components/molecules/pagination";
import { ApiError, orderService } from "@/services/api";
import type { OrderSummary } from "@/components/molecules/order-card";

type ApiOrder = { id?: string | number; orderNumber?: string; createdAt?: string; totalAmount?: number | string; total?: number | string; status?: string; items?: unknown[]; orderItems?: unknown[] };
type ApiOrdersResponse = ApiOrder[] | { items?: ApiOrder[]; data?: ApiOrder[]; pagination?: { page?: number; limit?: number; totalPages?: number } };

function toSummary(order: ApiOrder): OrderSummary {
	return { id: String(order.orderNumber ?? order.id ?? "-"), date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-", amount: Number(order.totalAmount ?? order.total ?? 0), status: order.status ?? "pending", items: order.items?.length ?? order.orderItems?.length ?? 0 };
}

function OrdersContent() {
	const [orders, setOrders] = useState<OrderSummary[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [message, setMessage] = useState("Loading your orders...");
	const searchParams = useSearchParams();
	const page = Math.max(1, Number(searchParams.get("page") ?? 1));
	useEffect(() => { orderService.list<ApiOrdersResponse>(page, 10).then((response) => { const items = Array.isArray(response) ? response : response.items ?? response.data ?? []; setOrders(items.map(toSummary)); setTotalPages(response && !Array.isArray(response) ? response.pagination?.totalPages ?? 1 : 1); setMessage(items.length ? "" : "No orders yet."); }).catch((error) => { if (error instanceof ApiError && error.status === 401) { window.location.href = `/login?next=${encodeURIComponent("/orders")}`; return; } setMessage("We could not load your orders."); }); }, [page]);
	return <PageShell><section className="mx-auto max-w-[1000px] px-5 py-16 md:px-10 md:py-24"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">Your account</p><div className="mb-12 flex items-end justify-between"><h1 className="font-serif text-6xl tracking-[-.06em]">My orders.</h1><span className="text-xs text-[var(--muted)]">Page {page}</span></div>{message ? <div className="border-y border-[var(--line)] py-12"><p className="font-serif text-3xl">{message}</p>{message === "No orders yet." && <Link href="/products" className="mt-6 inline-block border-b border-[var(--ink)] pb-2 text-xs uppercase tracking-[.14em]">Explore the collection →</Link>}</div> : <div className="border-y border-[var(--line)]">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div>}{totalPages > 1 && <Pagination page={page} limit={10} />}</section></PageShell>;
}

export default function OrdersPage() {
	return <Suspense fallback={<PageShell><section className="mx-auto max-w-[1000px] px-5 py-16 md:px-10 md:py-24"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">Your account</p><div className="mb-12 flex items-end justify-between"><h1 className="font-serif text-6xl tracking-[-.06em]">My orders.</h1><span className="text-xs text-[var(--muted)]">Page 1</span></div><div className="border-y border-[var(--line)] py-12"><p className="font-serif text-3xl">Loading your orders...</p></div></section></PageShell>}><OrdersContent /></Suspense>;
}
