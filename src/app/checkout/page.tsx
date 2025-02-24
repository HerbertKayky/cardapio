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

    const formattedPhone = getFormattedPhoneForDB(phone);

    if (formattedPhone.length !== 13) {
      alert("Por favor, insira um número de telefone válido.");
      return;
    }

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone: formattedPhone,
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

    router.push(
      `/payment?orderId=${orderId}&observation=${encodeURIComponent(
        observation
      )}`
    );
  };

  function formatPhoneNumber(value: string) {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length >= 11) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (cleaned.length >= 7) {
      return cleaned.replace(/^(\d{2})(\d{1,4})(\d{0,4})$/, "($1) $2-$3");
    } else if (cleaned.length >= 3) {
      return cleaned.replace(/^(\d{2})(\d{1,4})$/, "($1) $2");
    }
    return cleaned;
  }
  function getFormattedPhoneForDB(value: string) {
    const cleaned = value.replace(/\D/g, ""); // Remove não numéricos
    return `55${cleaned}`; // Adiciona o código do Brasil
  }

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

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            +55
          </span>
          <input
            type="tel"
            placeholder="(DDD) 9XXXX-XXXX"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            className="w-full px-12 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

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
