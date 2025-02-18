"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirmOrder = () => {
    if (!name || !lastName || !phone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const whatsappMessage = `Olá! Meu nome é ${name} ${lastName} e gostaria de confirmar meu pedido. Meu WhatsApp é ${phone}.`;
    const whatsappUrl = `https://wa.me/8193296809?text=${encodeURIComponent(whatsappMessage)}`;

    window.location.href = whatsappUrl;
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dados do Pedido</h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
          Confirmar Pedido via WhatsApp
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
