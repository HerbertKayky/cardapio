"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <p className="mt-4">Seu carrinho está vazio.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">R$ {item.price} x {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Limpar Carrinho
          </button>
          <Link href="/" className="block mt-4 text-blue-500">Continuar comprando</Link>
        </div>
      )}
    </div>
  );
}
