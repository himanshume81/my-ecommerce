"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductArt } from "@/components/atoms/product-art";

export function ProductCard({ product }: { product: Product }) {
  return <article className="group rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 shadow-[0_4px_16px_rgba(24,35,55,.04)]"><div className="relative"><Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}><ProductArt color={product.color} art={product.art} className="aspect-square" /></Link><button aria-label={`Save ${product.name}`} className="absolute right-2 top-2 text-lg text-[var(--muted)]">♡</button></div><div className="pt-3"><Link href={`/products/${product.id}`} className="text-[13px] font-semibold hover:text-[var(--sage)]">{product.name}</Link><p className="mt-1 text-[10px] text-[var(--muted)]">{product.category}</p><div className="mt-2 flex items-center justify-between"><span className="font-bold text-[var(--sage)]">${product.price}</span><span className="text-[10px] text-[#f6ae3d]">★ 4.{Number(product.id) + 1}</span></div><button onClick={() => { const saved = JSON.parse(localStorage.getItem("morrow-cart") ?? "[]") as Product[]; localStorage.setItem("morrow-cart", JSON.stringify([...saved, product])); window.dispatchEvent(new Event("cart-updated")); }} className="mt-3 w-full bg-[var(--ink)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-white">Add to bag</button></div></article>;
}
