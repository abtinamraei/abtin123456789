'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '../../../store/usecartstore';
import AddToCartButton from '../../../components/AddToCartButton';

export default function MenPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <h1 className="text-2xl font-bold text-black mb-4">محصولات بچگانه</h1>

      {loading ? (
        <p className="text-center text-gray-500">در حال بارگذاری محصولات...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">هیچ محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">{product.emoji}</div>
              <h2 className="text-lg font-semibold text-black">{product.name}</h2>
              <p className="text-black mt-1">{product.price.toLocaleString()} تومان</p>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}