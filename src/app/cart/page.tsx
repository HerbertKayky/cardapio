"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    observation,
    setObservation,
  } = useCart();

  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <div className="mt-4 text-center">
          <p>Seu carrinho está vazio.</p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Voltar para a página inicial
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image || ""}
                  alt={item.name}
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    R$ {item.price} x {item.quantity} Un
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
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
          <div className="mt-4">
            <label className="font-bold">
              Observação:
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="w-full p-2 border rounded-md mt-1 font-medium"
              />
            </label>
          </div>
          <div className="mt-4 text-right font-bold text-lg">
            Total: R$ {totalPrice}
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md w-full"
          >
            Prosseguir com o Pedido
          </button>
          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md w-full"
          >
            Limpar Carrinho
          </button>
          <Link href="/" className="block mt-4 text-blue-500 text-center">
            Continuar comprando
          </Link>
        </div>
      )}
    </div>
  );
}
