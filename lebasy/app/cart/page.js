'use client';

import { useCartStore } from '../../store/usecartstore';

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0)
    return <p className="text-center text-black p-6">سبد خرید شما خالی است.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl text-black font-bold mb-4">سبد خرید</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="bg-gray-500 p-4 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm  text-gray-1000">{item.price.toLocaleString()} تومان</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-16 text-center text-black border rounded"
            />
            <button onClick={() => removeFromCart(item.id)} className="text-red-600 font-bold">حذف</button>
          </div>
        </div>
      ))}

      <div className="text-right text-black font-bold text-lg mt-4">
        مجموع: {totalPrice.toLocaleString()} تومان
      </div>

      <div className="text-left mt-4">
        <button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded">خالی کردن سبد خرید</button>
      </div>
    </div>
  );
}
