"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api/errors";
import { orderService } from "@/features/orders/services/orders.service";

export type ApiOrder = {
  id?: string | number;
  orderNumber?: string;
  createdAt?: string;
  totalAmount?: number | string;
  total?: number | string;
  status?: string;
  items?: unknown[];
  orderItems?: unknown[];
};

export type ApiOrdersResponse =
  | ApiOrder[]
  | {
      items?: ApiOrder[];
      data?: ApiOrder[];
      pagination?: { page?: number; limit?: number; totalPages?: number };
    };

export type OrderSummary = {
  id: string;
  date: string;
  amount: number;
  status: string;
  items: number;
};

function toSummary(order: ApiOrder): OrderSummary {
  return {
    id: String(order.orderNumber ?? order.id ?? "-"),
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-",
    amount: Number(order.totalAmount ?? order.total ?? 0),
    status: order.status ?? "pending",
    items: order.items?.length ?? order.orderItems?.length ?? 0,
  };
}

export function useOrders(page: number) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("Loading your orders...");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await orderService.list<ApiOrdersResponse>(page, 10);
        if (!active) {
          return;
        }

        const items = Array.isArray(response)
          ? response
          : response.items ?? response.data ?? [];

        setOrders(items.map(toSummary));
        setTotalPages(
          response && !Array.isArray(response)
            ? response.pagination?.totalPages ?? 1
            : 1,
        );
        setMessage(items.length ? "" : "No orders yet.");
      } catch (error) {
        if (!active) {
          return;
        }

        if (error instanceof ApiError && error.status === 401) {
          window.location.href = `/login?next=${encodeURIComponent("/orders")}`;
          return;
        }

        setMessage("We could not load your orders.");
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [page]);

  return { orders, totalPages, message };
}
