import Link from "next/link";
import type { Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return <article className="group"><Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}><div className="product-art flex aspect-[.92] items-center justify-center rounded-[2px]" style={{ backgroundColor: product.color }}><span className="font-serif text-[112px] text-white/70 transition-transform duration-500 group-hover:scale-110">{product.art}</span><span className="absolute left-4 top-4 text-[10px] uppercase tracking-[.16em] text-black/45">{product.category}</span></div></Link><div className="flex items-start justify-between gap-4 pt-4"><div><Link href={`/products/${product.id}`} className="font-serif text-[20px] hover:text-[var(--clay)]">{product.name}</Link><p className="mt-1 text-[12px] text-[var(--muted)]">{product.note}</p></div><span className="pt-1 text-[13px]">${product.price}</span></div></article>;
}
