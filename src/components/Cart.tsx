'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export function Cart() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center">
      <FiShoppingCart size={24} className="text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
