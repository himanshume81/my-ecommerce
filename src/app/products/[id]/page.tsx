import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/atoms/add-to-cart-button";
import { PageShell } from "@/components/common/page-shell";
import { categoryService, productService } from "@/services/api";
import { normalizeProduct } from "@/types/product";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	let product;
	try {
		const id = (await params).id;
		const [productResponse, categoryResponse] = await Promise.all([productService.detail(id), categoryService.list()]);
		const categories = Array.isArray(categoryResponse) ? categoryResponse : categoryResponse.items ?? categoryResponse.data ?? [];
		product = normalizeProduct(productResponse, categories);
	} catch {
		notFound();
	}
	return <PageShell><section className="mx-auto grid max-w-[1080px] gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24"><div className="product-art flex aspect-square items-center justify-center" style={{ backgroundColor: product.color }}><span className="font-serif text-[180px] text-white/70">{product.art}</span></div><div className="flex flex-col justify-center"><Link href="/products" className="mb-10 text-xs uppercase tracking-[.14em] text-[var(--muted)]">← Back to collection</Link><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--clay)]">{product.category}</p><h1 className="font-serif text-6xl tracking-[-.06em]">{product.name}</h1><p className="mt-5 text-lg">${product.price}</p><p className="mt-8 max-w-md text-sm leading-7 text-[var(--muted)]">{product.description}</p><AddToCartButton product={product} /></div></section></PageShell>;
}
