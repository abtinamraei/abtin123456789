'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/usecartstore'; // مسیر درست رو گذاشتم
import AddToCartButton from '../../components/AddToCartButton'; // اضافه کردم

export default function ShopPage() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoadingCategories(false);
      });
  }, []);

  useEffect(() => {
    setLoadingProducts(true);
    let url = '/api/products?';
    if (category && category !== 'all') {
      url += `category=${category}&`;
    }
    if (sort && sort !== 'default') {
      url += `sort=${sort}&`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoadingProducts(false);
      });
  }, [category, sort]);

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">فروشگاه کامل محصولات</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setCategory('all')}
          className={`p-2 rounded-lg font-semibold ${
            category === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          همه دسته‌ها
        </button>
        {loadingCategories ? (
          <p>در حال بارگذاری دسته‌بندی‌ها...</p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`p-2 rounded-lg flex items-center gap-2 font-semibold ${
                category === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 bg-green-100 text-gray-800 font-semibold hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
      </div>

      {loadingProducts ? (
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
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.price.toLocaleString()} تومان</p>

              {/* اینجا دکمه افزودن به سبد خرید */}
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
