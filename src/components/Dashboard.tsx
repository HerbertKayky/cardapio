"use client";

import { useCart } from "@/context/CartContext";
import { Burger } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Dashboard() {
  const { addToCart } = useCart();
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBurgers();
  }, []);

  async function fetchBurgers() {
    const res = await fetch("/api/burgers");
    const data = await res.json();
    setBurgers(data);
    setLoading(false);
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="py-4">
      <div className="pt-2">
        <p className="text-xs">Aberto até 22h • Pedido mín. R$ 6,00</p>
      </div>

      <div className="pt-10">
        <h1 className="font-bold text-lg">Os mais pedidos</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {burgers.map((item) => (
            <div key={item.id} className="bg-gray-100 p-2 rounded-lg">
              <Link href={`/burgers/${item.id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-md"
                />
              </Link>
              <p className="text-sm font-semibold mt-2">{item.name}</p>
              <p className="text-xs text-gray-600">R$ {item.price}</p>
              <button
                onClick={() => addToCart({ ...item, id: item.id, quantity: 1 })}
                className="mt-2 w-full py-1 bg-blue-500 text-white rounded-md"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-10">
        <h1 className="font-bold text-lg">Burgers Artesanais</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {burgers.map((item) => (
            <div
              key={item.id}
              className="flex border-gray-300 border rounded-lg"
            >
              <Link className="flex items-center" href={`/burgers/${item.id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-36 object-contain rounded-md"
                />

                <div className="flex flex-col gap-2 p-4">
                  <h1 className=" font-semibold mt-2">{item.name}</h1>
                  <p className=" text-gray-600">{item.description}</p>
                  <p className="font-bold text-gray-600">R$ {item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
