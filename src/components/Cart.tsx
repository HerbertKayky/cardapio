"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export function Cart() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center top-[2px]">
      <FiShoppingCart size={22} className="text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
