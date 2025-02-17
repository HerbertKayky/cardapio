"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export function Dashboard() {
  const { addToCart } = useCart();

  const mostOrdered = [
    {
      id: 1,
      name: "Cheese Burger",
      description: "Pão brioche, carne 150g, queijo cheddar e molho especial.",
      price: 18.0,
      image: "/burgers/cheese.webp",
    },
    {
      id: 2,
      name: "Bacon Burger",
      description: "Pão brioche, carne 150g, bacon crocante e cheddar.",
      price: 22.0,
      image: "/burgers/bacon.jpg",
    },
    {
      id: 3,
      name: "Double Cheese",
      description: "Pão brioche, carne dupla, queijo cheddar e molho especial.",
      price: 20.0,
      image: "/burgers/dbcheese.jpg",
    },
    {
      id: 4,
      name: "Smash Burger",
      description: "Pão brioche, carne smash, cebola caramelizada e queijo.",
      price: 18.0,
      image: "/burgers/smash.jpg",
    },
  ];

  return (
    <div className="py-4">
      <div className="pt-2">
        <p className="text-xs">Aberto até 22h • Pedido mín. R$ 6,00</p>
      </div>

      <div className="pt-10">
        <h1 className="font-bold text-lg">Os mais pedidos</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {mostOrdered.map((item) => (
            <div key={item.id} className="bg-gray-100 p-2 rounded-lg">
              <Link href={`/burger/${item.id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-md"
                />
              </Link>
              <p className="text-sm font-semibold mt-2">{item.name}</p>
              <p className="text-xs text-gray-600">
                R$ {item.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {mostOrdered.map((item) => (
            <div
              key={item.id}
              className="flex border-gray-300 border p-2 rounded-lg"
            >
              <Link href={`/burger/${item.id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-28 object-contain rounded-md"
                />
              </Link>
              <div className="flex flex-col gap-2 p-4">
                <h1 className=" font-semibold mt-2">{item.name}</h1>
                <p className=" text-gray-600">
                  {item.description}
                </p>
                <p className="font-bold text-gray-600">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
