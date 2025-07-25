'use client';

import React from 'react';
import { useCartStore } from '../../store/usecartstore';

export default function CartItems() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCartStore();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 font-semibold text-lg">
        سبد خرید شما خالی است
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-right text-gray-900">سبد خرید شما</h2>

      <ul className="space-y-6">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-5 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 gap-6"
          >
            <div className="flex items-center gap-5 w-full md:w-auto">
              {item.emoji && (
                <div className="text-5xl select-none">{item.emoji}</div>
              )}
              <div className="text-right flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600 mt-1">{item.price.toLocaleString()} تومان</p>
              </div>
            </div>

            <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-normal">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden select-none">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-bold transition-colors duration-200 rounded-l-lg"
                  aria-label="کاهش تعداد"
                >
                  −
                </button>
                <span className="px-6 py-2 bg-white text-gray-900 font-semibold border-x border-gray-300">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold transition-colors duration-200 rounded-r-lg"
                  aria-label="افزایش تعداد"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold shadow-md flex items-center gap-2"
                aria-label="حذف محصول"
                title="حذف محصول"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 pt-6 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center gap-5 font-bold text-2xl text-gray-900">
        <span className="order-2 sm:order-1">مجموع: {totalPrice.toLocaleString()} تومان</span>
        <div className="flex gap-4 order-1 sm:order-2">
          <button
            onClick={clearCart}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg transition-colors font-semibold shadow-md"
          >
            پاک کردن سبد
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold shadow-md"
          >
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
