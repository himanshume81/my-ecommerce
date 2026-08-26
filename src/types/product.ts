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

export type Category = {
  id: number | string;
  name: string;
  slug?: string;
};

export type ProductApiRecord = Omit<Product, "category"> & {
  category?: string | Category;
  categoryId?: number | string;
};

export function normalizeProduct(product: ProductApiRecord, categories: Category[] = []): Product {
  const category = typeof product.category === "string"
    ? product.category
    : product.category?.name ?? categories.find((item) => String(item.id) === String(product.categoryId))?.name ?? "Uncategorized";

  return {
    ...product,
    price: Number(product.price),
    category,
    color: product.color ?? "#d3d8c9",
    art: product.art ?? "◒",
    note: product.note ?? "Considered everyday object",
  };
}
