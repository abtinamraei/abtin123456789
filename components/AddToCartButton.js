'use client';
import { useCartStore } from '../store/usecartstore';

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const getQuantity = useCartStore((state) => {
    const item = state.cartItems.find((i) => i.id === product.id);
    return item ? item.quantity : 0;
  });

  const quantity = getQuantity;

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition font-medium text-sm w-full"
        >
          افزودن به سبد خرید
        </button>
      ) : (
        <>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 shadow">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full text-lg"
            >
              −
            </button>

            <span className="text-base font-medium text-gray-800 px-2">
              {quantity} عدد
            </span>

            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full text-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition font-semibold text-sm"
            aria-label="حذف محصول"
          >
            حذف
          </button>
        </>
      )}
    </div>
  );
}
