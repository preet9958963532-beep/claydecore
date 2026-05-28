"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, CheckCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";

/* ─── Product Data ─── */
const PRODUCTS = [
  {
    id: 1,
    name: "Terracotta Arch Vase",
    price: 1499,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80",
    tag: "Bestseller",
    category: "Vases",
  },
  {
    id: 2,
    name: "Speckled Clay Planter",
    price: 1199,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
    tag: "New",
    category: "Planters",
  },
  {
    id: 3,
    name: "Rustic Bowl Set",
    price: 1999,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&q=80",
    tag: null,
    category: "Tableware",
  },
  {
    id: 4,
    name: "Sand Dune Pot",
    price: 1699,
    image: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=500&q=80",
    tag: "Sale",
    category: "Pots",
  },
  {
    id: 5,
    name: "Matte Earth Planter",
    price: 1349,
    image: "https://images.unsplash.com/photo-1521334726092-b509a19597c6?w=500&q=80",
    tag: null,
    category: "Planters",
  },
  {
    id: 6,
    name: "Driftwood Ceramic Bowl",
    price: 2199,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    tag: "Limited",
    category: "Tableware",
  },
];

/* ─── Product Card ─── */
function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addItem, state, increaseQty, decreaseQty } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = state.items.find((i) => i.id === product.id);
  const inCart = !!cartItem;

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  const TAG_STYLES: Record<string, string> = {
    Bestseller: "bg-[#C4622D] text-white",
    New: "bg-[#2C1A0E] text-white",
    Sale: "bg-[#8B6914] text-white",
    Limited: "bg-rose-600 text-white",
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8E0D5] hover:border-[#C4622D]/30 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F0E8DC]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              TAG_STYLES[product.tag] ?? "bg-gray-600 text-white"
            }`}
          >
            {product.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-[#8B6914] uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-[#2C1A0E] text-base flex-1 mb-2">{product.name}</h3>
        <p className="text-[#C4622D] font-bold text-lg mb-3">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        {/* Controls */}
        {inCart ? (
          <div className="flex items-center justify-between bg-[#F0E8DC] rounded-xl px-3 py-2">
            <button
              onClick={() => decreaseQty(product.id)}
              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#5C3D2E] hover:text-[#C4622D] shadow-sm transition-colors active:scale-95"
              aria-label="Decrease"
            >
              <Minus size={13} />
            </button>
            <span className="font-bold text-[#2C1A0E] text-sm">{cartItem!.quantity} in cart</span>
            <button
              onClick={() => increaseQty(product.id)}
              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#5C3D2E] hover:text-[#C4622D] shadow-sm transition-colors active:scale-95"
              aria-label="Increase"
            >
              <Plus size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
              justAdded
                ? "bg-green-500 text-white"
                : "bg-[#2C1A0E] text-white hover:bg-[#C4622D]"
            }`}
          >
            {justAdded ? (
              <>
                <CheckCircle size={15} /> Added!
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Products Grid ─── */
export default function ProductsGrid() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-[#2C1A0E] mb-6">All Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
