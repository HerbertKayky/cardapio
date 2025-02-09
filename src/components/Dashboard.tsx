"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export function Dashboard() {
  const { addToCart } = useCart();

  const mostOrdered = [
    {
      id: 1,
      name: "Cheese Burger",
      price: 18.0,
      image: "/burgers/cheese.webp",
    },
    { id: 2, name: "Bacon Burger", price: 22.0, image: "/burgers/bacon.jpg" },
    {
      id: 3,
      name: "Double Cheese",
      price: 20.0,
      image: "/burgers/dbcheese.jpg",
    },
    { id: 4, name: "Smash Burger", price: 18.0, image: "/burgers/smash.jpg" },
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
                <img
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
    </div>
  );
}
