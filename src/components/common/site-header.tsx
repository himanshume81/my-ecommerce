"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader({ count = 0 }: { count?: number }) {
  const [cartCount, setCartCount] = useState(count);
  useEffect(() => { const updateCount = () => { const items = JSON.parse(localStorage.getItem("morrow-cart") ?? "[]") as unknown[]; setCartCount(items.length); }; updateCount(); window.addEventListener("cart-updated", updateCount); return () => window.removeEventListener("cart-updated", updateCount); }, []);
  return <header className="border-b border-[var(--line)] bg-[var(--panel)]">
    <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 md:px-10">
      <Link href="/" className="text-[18px] font-bold tracking-[-.04em]"><span className="mr-1 text-[var(--sage)]">♧</span>ShopEase</Link>
      <label className="hidden h-9 max-w-[360px] flex-1 items-center gap-2 rounded-lg bg-[#f5f6fa] px-3 text-xs text-[var(--muted)] md:flex"><span>⌕</span><input aria-label="Search products" placeholder="Search products..." className="w-full bg-transparent outline-none" /></label>
      <div className="flex items-center gap-4 text-sm"><Link href="/profile" aria-label="Account">♡</Link><Link href="/cart" aria-label={`Cart with ${cartCount} items`} className="relative">🛒{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--sage)] px-1 text-[9px] text-white">{cartCount}</span>}</Link><Link href="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd9c9] text-xs font-semibold">JD</Link></div>
    </div>
    <nav className="mx-auto flex max-w-[1240px] gap-7 overflow-x-auto px-5 pb-3 text-[11px] font-medium md:px-10" aria-label="Main navigation"><Link href="/" className="border-b-2 border-[var(--sage)] pb-3 text-[var(--sage)]">Home</Link><Link href="/products" className="pb-3 text-[var(--muted)]">Products</Link><Link href="/#categories" className="pb-3 text-[var(--muted)]">Categories⌄</Link><Link href="/products" className="pb-3 text-[var(--muted)]">Deals</Link><Link href="/orders" className="pb-3 text-[var(--muted)]">My Orders</Link><Link href="/profile" className="pb-3 text-[var(--muted)]">Profile</Link></nav>
  </header>;
}
