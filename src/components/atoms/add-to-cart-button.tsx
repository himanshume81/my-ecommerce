"use client";

import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addToCart = () => {
    const saved = JSON.parse(localStorage.getItem("morrow-cart") ?? "[]") as Product[];
    localStorage.setItem("morrow-cart", JSON.stringify([...saved, product]));
    window.dispatchEvent(new Event("cart-updated"));
  };

  return <button onClick={addToCart} className="mt-10 inline-flex w-fit bg-[var(--ink)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[.14em] text-white">Add to bag</button>;
}
