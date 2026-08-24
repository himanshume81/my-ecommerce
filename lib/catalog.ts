export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  art: string;
  note: string;
  description?: string;
};

export const products: Product[] = [
  { id: 1, name: "Ripple tumbler", category: "Kitchen", price: 28, color: "#d3d8c9", art: "◒", note: "Hand-finished stoneware", description: "A tactile everyday tumbler with a soft ripple profile." },
  { id: 2, name: "Linen throw", category: "Living", price: 94, color: "#d8c8b4", art: "▱", note: "European flax · oat", description: "Lightweight European flax, woven for quiet evenings." },
  { id: 3, name: "Arc candle", category: "Objects", price: 36, color: "#e5b089", art: "◯", note: "Cedarwood & vetiver", description: "A warm cedarwood candle poured in small batches." },
  { id: 4, name: "Daily tote", category: "Carry", price: 68, color: "#b9c6c0", art: "∩", note: "Organic cotton canvas", description: "A durable, uncomplicated carry-all for every day." },
  { id: 5, name: "Silt vase", category: "Objects", price: 52, color: "#c9b5ac", art: "⌇", note: "Made in small batches", description: "A sculptural stoneware vase with a grounded matte finish." },
  { id: 6, name: "Field notes", category: "Paper", price: 18, color: "#d8d2b9", art: "✦", note: "Recycled paper · 80 pages", description: "A pocket notebook for lists, sketches, and small ideas." },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === Number(id));
}
