"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface Burger {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const burgers: Burger[] = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 18.0,
    image: "/burgers/cheese.webp",
    description: "Pão brioche, carne 150g, queijo cheddar e molho especial.",
  },
  {
    id: 2,
    name: "Bacon Burger",
    price: 22.0,
    image: "/burgers/bacon.jpg",
    description: "Pão brioche, carne 150g, bacon crocante e cheddar.",
  },
  {
    id: 3,
    name: "Double Cheese",
    price: 20.0,
    image: "/burgers/dbcheese.jpg",
    description: "Pão brioche, carne dupla, queijo cheddar e molho especial.",
  },
  {
    id: 4,
    name: "Smash Burger",
    price: 18.0,
    image: "/burgers/smash.jpg",
    description: "Pão brioche, carne smash, cebola caramelizada e queijo.",
  },
];

export default function BurgerDetails() {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();

  if (!params || !params.id) return notFound();

  const burger = burgers.find((b) => b.id === Number(params.id));

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
        src={burger.image}
        alt={burger.name}
        className="w-full h-[450px] object-contain rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{burger.name}</h1>
      <p className="text-gray-600 mt-2">{burger.description}</p>
      <p className="text-lg font-semibold mt-4">R$ {burger.price.toFixed(2)}</p>

      <button
        onClick={() => addToCart({ ...burger, quantity: 1 })}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
