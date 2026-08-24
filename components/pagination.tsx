import Link from "next/link";

export function Pagination({ page, limit = 10 }: { page: number; limit?: number }) {
  return <nav aria-label="Orders pagination" className="mt-8 flex gap-3"><Link href={`/orders?page=${Math.max(1, page - 1)}&limit=${limit}`} aria-disabled={page === 1} className="border border-[var(--line)] px-4 py-3 text-xs uppercase tracking-[.12em] aria-disabled:pointer-events-none aria-disabled:opacity-40">Previous</Link><Link href={`/orders?page=${page + 1}&limit=${limit}`} className="bg-[var(--ink)] px-4 py-3 text-xs uppercase tracking-[.12em] text-white">Next</Link></nav>;
}
