"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { cart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true);
    // Aqui você pode enviar um pedido de confirmação de pagamento ou realizar outra ação.
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumo do Pedido</h1>

      <div className="space-y-3">
        <p><strong>Itens:</strong></p>
        {cart.map((item) => (
          <p key={item.id}>{item.name} - {item.quantity} x R${item.price}</p>
        ))}
        <p className="font-semibold text-xl">Total: R$ {totalPrice}</p>

        <div className="mt-4">
          <p><strong>Chave PIX para pagamento:</strong></p>
          <p className="text-xl font-bold">12345678901@pix.com.br</p>
        </div>

        <div className="mt-4">
          <p>Por favor, realize o pagamento via PIX usando a chave acima.</p>
          <p>Após o pagamento, clique no botão abaixo para confirmar o pagamento.</p>
        </div>

        <button
          onClick={handlePaymentConfirmation}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Confirmar Pagamento
        </button>

        {paymentConfirmed && (
          <p className="mt-4 text-green-600">Pagamento confirmado! Seu pedido está sendo processado.</p>
        )}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Voltar à Página Inicial
      </button>
    </div>
  );
}
