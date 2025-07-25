'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/usecartstore';

export default function SideCart() {
  const cartItems = useCartStore(state => state.cartItems);
  const isSideCartOpen = useCartStore(state => state.isSideCartOpen);
  const closeSideCart = useCartStore(state => state.closeSideCart);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  if (!isSideCartOpen) return null;

  return (
    <div
      dir="rtl"
      className="
        fixed top-0 left-0 h-full bg-gray-50 shadow-lg p-4 z-[1500] flex flex-col
        w-full max-w-xs md:w-[360px] 
        transform transition-transform duration-300
      "
    >
      <button
        onClick={closeSideCart}
        className="self-start text-3xl font-bold text-gray-800 mb-4 hover:text-red-600 transition-colors"
        aria-label="بستن سبد خرید"
        title="بستن"
      >
        ✕
      </button>

      <h2 className="mb-4 font-bold text-xl text-gray-900">سبد خرید شما</h2>

      <ul className="flex-grow overflow-y-auto p-0 m-0 list-none mb-4">
        {cartItems.length === 0 && (
          <li className="text-gray-500 italic text-center">سبد خرید خالی است.</li>
        )}
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="mb-4 bg-white rounded-lg p-3 shadow-sm flex flex-col"
          >
            <div className="font-semibold text-gray-800 text-lg">{item.name}</div>

            <div className="mt-2 flex justify-between items-center gap-2 text-black">
              <div className="font-semibold">تعداد: {item.quantity}</div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  aria-label={`کاهش تعداد ${item.name}`}
                  title="کاهش تعداد"
                  className="bg-red-500 hover:bg-red-600 transition-colors text-white font-bold rounded w-8 h-8 flex items-center justify-center select-none shadow"
                >
                  −
                </button>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  aria-label={`افزایش تعداد ${item.name}`}
                  title="افزایش تعداد"
                  className="bg-green-500 hover:bg-green-600 transition-colors text-white font-bold rounded w-8 h-8 flex items-center justify-center select-none shadow"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`حذف ${item.name} از سبد خرید`}
                  title="حذف محصول"
                  className="bg-red-700 hover:bg-red-800 transition-colors text-white font-bold rounded w-8 h-8 flex items-center justify-center select-none text-xl shadow"
                >
                  ✖
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-300 pt-4">
        <Link
          href="/cart"
          onClick={closeSideCart}
          className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center shadow transition-colors"
        >
          رفتن به سبد خرید
        </Link>
      </div>
    </div>
  );
}
