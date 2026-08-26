"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/features/catalog/services/categories.service";
import { productService } from "@/features/catalog/services/products.service";
import { getListItems } from "@/lib/api/utils";
import {
  normalizeProduct,
  type Category,
  type Product,
} from "@/types/product";

export function useStorefrontData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);
        const categoryResponse = await categoryService.list();
        if (!active) {
          return;
        }

        const nextCategories = getListItems(categoryResponse);
        setCategories(nextCategories);

        const productResponse = await productService.list();
        if (!active) {
          return;
        }

        setProducts(
          getListItems(productResponse).map((product) =>
            normalizeProduct(product, nextCategories),
          ),
        );
      } catch {
        if (!active) {
          return;
        }

        setCategories([]);
        setProducts([]);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { products, categories, isLoading };
}
