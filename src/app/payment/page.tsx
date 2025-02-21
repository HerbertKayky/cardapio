"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { cart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [observation, setObservation] = useState<string | null>("");
  const [proofile, setProofile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const obs = urlParams.get("observation");
    if (obs) {
      setObservation(decodeURIComponent(obs));
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePaymentConfirmation = async () => {
    if (!proofile) {
      alert("Por favor, envie o comprovante de pagamento.");
      return;
    }

    const formData = new FormData();
    formData.append("file", proofile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setPaymentConfirmed(true);
    } else {
      alert("Erro ao enviar o comprovante de pagamento. Tente novamente.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumo do Pedido</h1>

      <div className="space-y-3">
        <p>
          <strong>Itens:</strong>
        </p>
        {cart.map((item) => (
          <p key={item.id}>
            {item.name} - {item.quantity} x R${item.price}
          </p>
        ))}
        <p className="font-semibold text-xl">Total: R$ {totalPrice}</p>

        <div className="mt-4">
          <p>
            <strong>Chave PIX para pagamento:</strong>
          </p>
          <p className="text-xl font-bold">12345678901@pix.com.br</p>
        </div>

        <div className="mt-4">
          <p>Por favor, realize o pagamento via PIX usando a chave acima.</p>
          <p>
            Após o pagamento, clique no botão abaixo para confirmar o pagamento.
          </p>
        </div>

        {observation && (
          <div className="mt-4">
            <p className="font-bold">Obseração: {observation}</p>
          </div>
        )}

        <div className="mt-4">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-ful h-auto max-h-64 object-contain"
            />
          )}
        </div>

        <button
          onClick={handlePaymentConfirmation}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Confirmar Pagamento
        </button>

        {paymentConfirmed && (
          <p className="mt-4 text-green-600">
            Pagamento confirmado! Seu pedido está sendo processado.
          </p>
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
