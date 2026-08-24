import { PageShell } from "@/components/common/page-shell";
import { ProductCard } from "@/components/molecules/product-card";
import { productService, categoryService } from "@/services/api";
import { normalizeProduct, type Category } from "@/types/product";

function getItems<T>(response: T[] | { data?: T[]; items?: T[] }): T[] {
	return Array.isArray(response) ? response : response.items ?? response.data ?? [];
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
	const selected = (await searchParams).category;
	const [productResponse, categoryResponse] = await Promise.all([productService.list(), categoryService.list()]);
	const apiCategories = getItems(categoryResponse);
	const products = getItems(productResponse).map((product) => normalizeProduct(product, apiCategories));
	const categories = ["All", ...apiCategories.map((category: Category) => category.name)];
	const visibleProducts = selected ? products.filter((product) => product.category === selected) : products;

	return <PageShell><section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-24"><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">The collection</p><div className="mb-8 flex items-end justify-between gap-5"><h1 className="font-serif text-5xl tracking-[-.05em]">Made to be lived with.</h1><span className="text-xs text-[var(--muted)]">{visibleProducts.length} objects</span></div><div id="categories" className="mb-12 flex flex-wrap gap-2 border-y border-[var(--line)] py-4" aria-label="Product categories">{categories.map((category) => <a key={category} href={category === "All" ? "/products#categories" : `/products?category=${encodeURIComponent(category)}#categories`} aria-current={selected === category || (!selected && category === "All") ? "page" : undefined} className={`rounded-full border px-4 py-2 text-[11px] font-medium ${selected === category || (!selected && category === "All") ? "border-[var(--sage)] bg-[var(--sage)] text-white" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--sage)] hover:text-[var(--sage)]"}`}>{category}</a>)}</div>{visibleProducts.length === 0 ? <p className="border-y border-[var(--line)] py-16 text-center font-serif text-3xl">No products in this category.</p> : <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</section></PageShell>;
}
