"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { Burger } from "@/utils/types";
import Link from "next/link";

const burgerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  price: z.number().min(0, "O preço é obrigatório"),
  image: z.string().url("A imagem deve ser uma URL válida").optional(),
  description: z.string().min(1, "A descrição é obrigatória"),
});

export default function AdminPage() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [form, setForm] = useState<Burger>({
    name: "",
    price: 0,
    image: "",
    description: "",
    id: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const [proofModal, setProofModal] = useState<{
    open: boolean;
    url: string | null;
  }>({
    open: false,
    url: null,
  });

  const SkeletonBox = () => (
    <div className="animate-pulse p-4 border rounded bg-gray-200 h-16"></div>
  );

  useEffect(() => {
    fetchBurgers();
    fetchOrders();
  }, []);

  async function fetchBurgers() {
    const res = await fetch("/api/burgers");
    const data = await res.json();
    setBurgers(data);
  }

  async function fetchOrders() {
    const res = await fetch("/api/order");
    const data = await res.json();
    setOrders(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const validation = burgerSchema.safeParse(form);
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);
    await fetch("/api/burgers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", price: 0, image: "", description: "", id: "" });
    setLoading(false);
    fetchBurgers();
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este hambúrguer?")) return;
    await fetch(`/api/burgers/${id}`, { method: "DELETE" });
    fetchBurgers();
  }

  async function handleRemoveOrder(orderId: string) {
    if (!confirm("Tem certeza que deseja remover este pedido?")) return;
    await fetch(`/api/order/${orderId}`, { method: "DELETE" });
    fetchOrders();
  }

  async function handleApproveOrder(id: string, phone: string) {
    await fetch(`/api/order/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const message = encodeURIComponent(
      `Olá! seu pedido foi confirmado e está sendo preparado. Em breve, ele será enviado. Obrigado por escolher nossa hamburgueria! 🍔🔥`
    );
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(whatsappLink, "_blank");
    fetchOrders();
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Painel de Administração</h1>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name[0]}</p>
        )}

        <input
          type="number"
          placeholder="Preço"
          value={form.price === 0 ? "" : form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price[0]}</p>
        )}

        <input
          type="text"
          placeholder="URL da Imagem"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image[0]}</p>
        )}

        <textarea
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description[0]}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Adicionando..." : "Adicionar Hambúrguer"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Hambúrgueres Cadastrados</h2>
      <div className="mt-4 space-y-2">
        {burgers.length === 0 && (
          <>
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
          </>
        )}
        {burgers.map((burger) => (
          <div
            key={burger.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <p className="font-semibold">{burger.name}</p>
              <p className="text-sm text-gray-600">R$ {burger.price}</p>
            </div>
            <button
              onClick={() => handleDelete(burger.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Pedidos Recentes</h2>
      <div className="mt-4 space-y-2">
        {orders.length === 0 ? (
          <p className="text-gray-500">Nenhum pedido realizado ainda.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="flex flex-col p-4 border rounded">
              <h3 className="font-semibold">Pedido #{order.id}</h3>
              <p>
                <Link
                  className=""
                  target="_blank"
                  href={`https://wa.me/${order.user.phone}`}
                >
                  <strong>Telefone:</strong>{" "}
                  <span className="underline">{order.user.phone}</span>
                </Link>
              </p>
              <p>
                <strong>Total:</strong> R$ {order.total}
              </p>
              <p>
                <strong>Observação:</strong> {order.observation || "Nenhuma"}
              </p>

              <h4 className="mt-2 font-semibold">Itens</h4>
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>R$ {item.price}</span>
                </div>
              ))}

              {order.proofUrl && (
                <div className="mt-3">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() =>
                      setProofModal({ open: true, url: order.proofUrl })
                    }
                  >
                    Ver comprovante
                  </button>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                {order.status !== "approved" && (
                  <button
                    onClick={() =>
                      handleApproveOrder(order.id, order.user.phone)
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Confirmar Pagamento
                  </button>
                )}
                <button
                  onClick={() => handleRemoveOrder(order.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remover Pedido
                </button>
              </div>
            </div>
          ))
        )}
        {proofModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg max-w-sm">
              <h2 className="text-lg font-semibold mb-2">Comprovante</h2>
              <img
                src={proofModal.url || ""}
                className="w-full rounded-lg"
                alt="Comprovante"
              />
              <button
                className="mt-4 w-full py-2 bg-red-500 text-white rounded"
                onClick={() => setProofModal({ open: false, url: null })}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
