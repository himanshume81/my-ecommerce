import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { OrderCard } from "@/components/order-card";
import { Pagination } from "@/components/pagination";

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) { const params = await searchParams; const page = Number(params.page ?? 1); return <PageShell><section className="mx-auto max-w-[1000px] px-5 py-16 md:px-10 md:py-24"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">Your account</p><div className="mb-12 flex items-end justify-between"><h1 className="font-serif text-6xl tracking-[-.06em]">My orders.</h1><span className="text-xs text-[var(--muted)]">Page {page}</span></div><div className="border-y border-[var(--line)]"><OrderCard order={{ id: "Awaiting connection", date: "-", amount: 0, status: "pending", items: 0 }} /><p className="pb-8 text-sm leading-6 text-[var(--muted)]">Connect the orders service to load your latest purchases securely.</p></div><Pagination page={page} limit={Number(params.limit ?? 10)} /></section></PageShell>; }
