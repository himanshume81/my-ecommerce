"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = { id: number; name: string; category: string; price: number; color: string; art: string; note: string };

const products: Product[] = [
  { id: 1, name: "Ripple tumbler", category: "Kitchen", price: 28, color: "#d3d8c9", art: "◒", note: "Hand-finished stoneware" },
  { id: 2, name: "Linen throw", category: "Living", price: 94, color: "#d8c8b4", art: "▱", note: "European flax · oat" },
  { id: 3, name: "Arc candle", category: "Objects", price: 36, color: "#e5b089", art: "◯", note: "Cedarwood & vetiver" },
  { id: 4, name: "Daily tote", category: "Carry", price: 68, color: "#b9c6c0", art: "∩", note: "Organic cotton canvas" },
  { id: 5, name: "Silt vase", category: "Objects", price: 52, color: "#c9b5ac", art: "⌇", note: "Made in small batches" },
  { id: 6, name: "Field notes", category: "Paper", price: 18, color: "#d8d2b9", art: "✦", note: "Recycled paper · 80 pages" },
];

function Header({ count }: { count: number }) {
  return <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-6 md:px-10">
    <Link href="/" className="font-serif text-[26px] tracking-[-.04em]">morrow<span className="text-[var(--clay)]">.</span></Link>
    <nav className="hidden items-center gap-8 text-[13px] font-medium text-[var(--muted)] md:flex" aria-label="Main navigation">
      <a href="#shop" className="hover:text-[var(--ink)]">Shop all</a><a href="#story" className="hover:text-[var(--ink)]">Our story</a><a href="#journal" className="hover:text-[var(--ink)]">Journal</a>
    </nav>
    <div className="flex items-center gap-2 text-[13px] font-medium">
      <Link href="/profile" className="hidden px-3 py-2 text-[var(--muted)] hover:text-[var(--ink)] sm:block">Account</Link>
      <Link href="/cart" className="rounded-full border border-[var(--line)] px-4 py-2 hover:border-[var(--ink)]">Bag ({count})</Link>
    </div>
  </header>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return <article className="group">
    <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
      <div className="product-art flex aspect-[.92] items-center justify-center rounded-[2px]" style={{ backgroundColor: product.color }}>
        <span className="font-serif text-[112px] leading-none text-white/70 transition-transform duration-500 group-hover:scale-110">{product.art}</span>
        <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[.16em] text-black/45">{product.category}</span>
      </div>
    </Link>
    <div className="flex items-start justify-between gap-4 pt-4">
      <div><Link href={`/products/${product.id}`} className="font-serif text-[20px] hover:text-[var(--clay)]">{product.name}</Link><p className="mt-1 text-[12px] text-[var(--muted)]">{product.note}</p></div>
      <span className="pt-1 text-[13px]">${product.price}</span>
    </div>
    <button onClick={() => onAdd(product)} className="mt-4 w-full border-b border-[var(--ink)] pb-2 text-left text-[12px] font-medium uppercase tracking-[.12em] opacity-0 focus:opacity-100 group-hover:opacity-100">Add to bag <span className="float-right">+</span></button>
  </article>;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");
  useEffect(() => { const saved = window.localStorage.getItem("morrow-cart"); if (saved) setCart(JSON.parse(saved)); }, []);
  useEffect(() => { window.localStorage.setItem("morrow-cart", JSON.stringify(cart)); }, [cart]);
  const addToCart = (product: Product) => { setCart((items) => [...items, product]); setNotice(`${product.name} added to your bag`); window.setTimeout(() => setNotice(""), 2200); };
  const filtered = category === "All" ? products : products.filter((product) => product.category === category);
  const categories = ["All", "Kitchen", "Living", "Objects", "Carry", "Paper"];
  return <main className="min-h-screen overflow-hidden bg-[var(--background)]">
    <div className="grain fixed inset-0 z-0" />
    <div className="relative z-10">
      <Header count={cart.length} />
      {notice && <div role="status" className="fixed right-5 top-5 z-30 bg-[var(--ink)] px-5 py-3 text-[12px] text-white shadow-xl">{notice}</div>}
      <section className="mx-auto grid max-w-[1240px] items-end gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.1fr_.9fr] md:px-10 md:pb-28 md:pt-24">
        <div className="rise"><p className="mb-7 text-[11px] font-medium uppercase tracking-[.2em] text-[var(--clay)]">Objects for the everyday</p><h1 className="max-w-[670px] font-serif text-[clamp(4rem,9vw,8.6rem)] leading-[.86] tracking-[-.07em]">Less, but<br /><em className="text-[var(--sage)]">better.</em></h1><p className="mt-9 max-w-[370px] text-[15px] leading-7 text-[var(--muted)]">A small collection of useful, beautiful things for a life lived at a gentler pace.</p><a href="#shop" className="mt-8 inline-flex items-center gap-5 border-b border-[var(--ink)] pb-2 text-[12px] font-semibold uppercase tracking-[.13em]">Explore the collection <span className="text-lg">↓</span></a></div>
        <div className="relative mx-auto w-full max-w-[460px] md:mb-3"><div className="product-art flex aspect-square items-center justify-center bg-[#d7c9b7]"><span className="font-serif text-[190px] leading-none text-white/60">◓</span><p className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[.14em] text-black/45">No. 01 / Form & function</p></div><div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-[var(--clay)]" /></div>
      </section>
      <section id="shop" className="border-t border-[var(--line)] px-5 py-16 md:px-10 md:py-24"><div className="mx-auto max-w-[1240px]"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">The collection</p><h2 className="font-serif text-4xl tracking-[-.04em] md:text-5xl">Made to be lived with.</h2></div><div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} role="tab" aria-selected={category === item} className={`px-3 py-2 text-[11px] uppercase tracking-[.12em] ${category === item ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}>{item}</button>)}</div></div><div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div></div></section>
      <section id="story" className="bg-[var(--sage)] px-5 py-20 text-[#f5f2ec] md:px-10 md:py-28"><div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[.8fr_1fr] md:items-end"><p className="font-serif text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">Thoughtful things<br />have a longer life.</p><div><p className="max-w-[410px] text-[15px] leading-7 text-white/75">We work with independent makers and honest materials to bring a little more intention to the objects that surround you.</p><a href="#journal" className="mt-8 inline-block border-b border-white/60 pb-2 text-[11px] uppercase tracking-[.16em]">Read our story →</a></div></div></section>
      <footer id="journal" className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-8 text-[11px] uppercase tracking-[.14em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between md:px-10"><span>© 2026 Morrow Objects</span><span>Small things, well considered.</span><div className="flex gap-5"><Link href="/orders" className="hover:text-[var(--ink)]">Orders</Link><Link href="/login" className="hover:text-[var(--ink)]">Sign in</Link></div></footer>
    </div>
  </main>;
}
