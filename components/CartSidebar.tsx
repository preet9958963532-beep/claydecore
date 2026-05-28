"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react";

export default function CartSidebar() {
  const {
    state,
    closeCart,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { items, isOpen } = state;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Sidebar Panel ── */}
      <aside
        className={`fixed top-16 right-0 z-50 h-[calc(100vh-64px)] w-[380px] max-w-md-[#FDFAF7] shadow-2xl flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E0D5]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-[#C4622D]" />
            <h2 className="font-bold text-[#2C1A0E] text-lg tracking-tight">
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-semibold text-white bg-[#C4622D] rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C3D2E] hover:bg-[#F0E8DC] hover:text-[#C4622D] transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F0E8DC] flex items-center justify-center">
              <Package size={32} className="text-[#C4622D]/50" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1A0E] text-lg">Your cart is empty</p>
              <p className="text-sm text-[#8B6914] mt-1">Add something beautiful to get started.</p>
            </div>
            <button
              onClick={closeCart}
              className="mt-2 text-sm font-medium text-[#C4622D] underline underline-offset-4 hover:text-[#A0522D]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Item list */}
            <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 bg-white rounded-2xl p-3.5 shadow-sm border border-[#E8E0D5] group"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F0E8DC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#2C1A0E] text-sm leading-snug truncate pr-1">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 text-[#C4622D]/40 hover:text-[#C4622D] transition-colors mt-0.5"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[#C4622D] font-bold text-base mt-1">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <p className="text-[#8B6914] text-xs">₹{item.price.toLocaleString("en-IN")} each</p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-7 h-7 rounded-lg border border-[#E8E0D5] flex items-center justify-center text-[#5C3D2E] hover:bg-[#F0E8DC] hover:border-[#C4622D]/30 transition-all active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold text-[#2C1A0E] w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-7 h-7 rounded-lg border border-[#E8E0D5] flex items-center justify-center text-[#5C3D2E] hover:bg-[#F0E8DC] hover:border-[#C4622D]/30 transition-all active:scale-95"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer summary */}
            <div className="border-t border-[#E8E0D5] px-6 py-5 bg-white space-y-4">
              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#5C3D2E]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#5C3D2E]">
                  <span>Delivery</span>
                  <span className={totalPrice >= 2499 ? "text-green-600 font-medium" : ""}>
                    {totalPrice >= 2499 ? "Free" : "₹99"}
                  </span>
                </div>
                {totalPrice < 2499 && (
                  <p className="text-xs text-[#8B6914] bg-[#F0E8DC] rounded-lg px-3 py-2">
                    Add ₹{(2499 - totalPrice).toLocaleString("en-IN")} more for free delivery 🎉
                  </p>
                )}
              </div>

              <div className="flex justify-between font-bold text-[#2C1A0E] text-base border-t border-[#E8E0D5] pt-3">
                <span>Total</span>
                <span className="text-[#C4622D]">
                  ₹{(totalPrice + (totalPrice >= 2499 ? 0 : 99)).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout CTA */}
              <a
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-[#C4622D] text-white font-semibold py-3.5 rounded-xl hover:bg-[#A0522D] transition-colors shadow-lg hover:shadow-xl active:scale-[0.98] text-sm"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </a>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-xs text-[#8B6914] hover:text-[#C4622D] transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
