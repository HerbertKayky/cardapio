"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Burger } from "@/utils/types";

export default function BurgerDetails() {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();
  const [burger, setBurger] = useState<Burger | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    async function fetchBurger() {
      const res = await fetch(`/api/burgers/${params.id}`);
      if (!res.ok) {
        setLoading(false);
        return notFound();
      }

      const data: Burger = await res.json();
      setBurger(data);
      setLoading(false);
    }

    fetchBurger();
  }, [params.id]);

  if (loading) return <div>Carregando...</div>;

  if (!burger) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-5">
      <div className="flex gap-2 items-center py-4">
        <button onClick={() => router.back()} className="">
          <IoIosArrowBack size={30} />
        </button>
        <h1>Detalhes do Hambúrguer</h1>
      </div>

      <Image
        width={1000}
        height={1000}
        priority={true}
        src={burger.image || ""}
        alt={burger.name}
        className="w-full h-[450px] object-contain rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{burger.name}</h1>
      <p className="text-gray-600 mt-2">{burger.description}</p>
      <p className="text-lg font-semibold mt-4">R$ {burger.price}</p>

      <button
        onClick={() => addToCart({ ...burger, quantity: 1 })}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
