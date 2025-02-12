"use client";
import { useState } from "react";
import { CiSearch, CiShare2 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Cart } from "./Cart";
import Link from "next/link";

export function Header() {
  const [isSearching, setIsSearching] = useState(false);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  return (
    <header className="flex items-center justify-center py-3 bg-[#3D3D3D] border-b gap-2">
      <div className="flex items-center justify-between w-full max-w-5xl text-white">
        <Link href="/" className="font-bold">
          Hamburgueria
        </Link>

        <div className="flex gap-2">
          {isSearching ? (
            <div className="flex items-center bg-[#E7E7E7] rounded-full px-2">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-transparent outline-none text-black px-2 py-1"
                autoFocus
              />
              <button onClick={toggleSearch} className="p-1">
                <IoClose size={20} color="#000" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={toggleSearch}
                className="p-1 bg-[#E7E7E7] rounded-full"
              >
                <CiSearch size={20} color="#000" />
              </button>
              <button className="p-1 bg-[#E7E7E7] rounded-full">
                <CiShare2 size={20} color="#000" />
              </button>
            </>
          )}
        </div>
      </div>
      <Cart />
    </header>
  );
}
