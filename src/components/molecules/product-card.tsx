import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductArt } from "@/components/atoms/product-art";

export function ProductCard({ product }: { product: Product }) {
  return <article className="group rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 shadow-[0_4px_16px_rgba(24,35,55,.04)]"><div className="relative"><Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}><ProductArt color={product.color} art={product.art} className="aspect-square" /></Link><button aria-label={`Save ${product.name}`} className="absolute right-2 top-2 text-lg text-[var(--muted)]">♡</button></div><div className="pt-3"><Link href={`/products/${product.id}`} className="text-[13px] font-semibold hover:text-[var(--sage)]">{product.name}</Link><p className="mt-1 text-[10px] text-[var(--muted)]">{product.category}</p><div className="mt-2 flex items-center justify-between"><span className="font-bold text-[var(--sage)]">${product.price}</span><span className="text-[10px] text-[#f6ae3d]">★ 4.{product.id + 1}</span></div></div></article>;
}
