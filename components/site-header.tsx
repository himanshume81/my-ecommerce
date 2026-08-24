import Link from "next/link";

export function SiteHeader({ count = 0 }: { count?: number }) {
  return <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-6 md:px-10">
    <Link href="/" className="font-serif text-[26px] tracking-[-.04em]">morrow<span className="text-[var(--clay)]">.</span></Link>
    <nav className="hidden items-center gap-8 text-[13px] font-medium text-[var(--muted)] md:flex" aria-label="Main navigation"><Link href="/products">Shop all</Link><Link href="/orders">Orders</Link><Link href="/profile">Account</Link></nav>
    <Link href="/cart" className="rounded-full border border-[var(--line)] px-4 py-2 text-[13px] hover:border-[var(--ink)]">Bag ({count})</Link>
  </header>;
}
