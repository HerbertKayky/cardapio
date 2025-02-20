"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { cart, observation } = useCart();

  const handleConfirmOrder = async () => {
    if (!name || !phone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        observation,
      }),
    });

    const { orderId } = await response.json();

    router.push(`/payment?orderId=${orderId}&observation=${encodeURIComponent(observation)}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dados do Pedido</h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nome e Sobrenome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="tel"
          placeholder="Número do WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <button
          onClick={handleConfirmOrder}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Prosseguir para Pagamento
        </button>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Voltar
      </button>
    </div>
  );
}
