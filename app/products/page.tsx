import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";

export default function ProductsPage() { return <PageShell><section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-24"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">The collection</p><div className="mb-12 flex items-end justify-between gap-5"><h1 className="font-serif text-5xl tracking-[-.05em]">Made to be lived with.</h1><span className="text-xs text-[var(--muted)]">{products.length} objects</span></div><div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></PageShell>; }
