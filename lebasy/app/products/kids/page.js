'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '../../../store/usecartstore';
export default function MenPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products?category=kids')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black mb-4">محصولات مردانه</h1>

      {loading ? (
        <p className="text-center text-gray-500">در حال بارگذاری محصولات...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">هیچ محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">{product.emoji}</div>
              <h2 className="text-lg font-semibold text-black">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.price.toLocaleString()} تومان</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                افزودن به سبد خرید
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
