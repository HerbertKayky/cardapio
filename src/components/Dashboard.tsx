import Link from "next/link";

export function Dashboard() {
  const mostOrdered = [
    {
      id: 1,
      name: "Cheese Burger",
      price: "R$ 18,00",
      image: "/burgers/cheese.webp",
    },
    {
      id: 2,
      name: "Bacon Burger",
      price: "R$ 22,00",
      image: "/burgers/bacon.jpg",
    },
    {
      id: 3,
      name: "Double Cheese",
      price: "R$ 20,00",
      image: "/burgers/dbcheese.jpg",
    },
    {
      id: 4,
      name: "Smash Burger",
      price: "R$ 18,00",
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

        {/* Grid de produtos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {mostOrdered.map((item) => (
            <Link key={item.id} href={`/burger/${item.id}`}>
              <div className="bg-gray-100 p-1 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-contain rounded-md"
                />
                <p className="text-sm font-semibold mt-2">{item.name}</p>
                <p className="text-xs text-gray-600">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
