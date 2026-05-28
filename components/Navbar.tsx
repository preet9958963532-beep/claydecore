"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Leaf } from "lucide-react";

export default function Navbar() {
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-[#FDFAF7]/95 backdrop-blur-md border-b border-[#E8E0D5] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-[#C4622D] flex items-center justify-center group-hover:scale-110 transition-transform shadow">
            <Leaf size={16} className="text-white" />
          </span>
          <span className="text-xl font-bold tracking-tight text-[#2C1A0E]">
            Clay<span className="text-[#C4622D]">Decore</span>
          </span>
        </a>

        {/* Cart button */}
        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 bg-[#2C1A0E] hover:bg-[#C4622D] text-white px-4 py-2 rounded-full transition-colors shadow-md hover:shadow-lg text-sm font-medium"
          aria-label="Open cart"
        >
          <ShoppingBag size={17} />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-[#C4622D] group-hover:bg-white text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
