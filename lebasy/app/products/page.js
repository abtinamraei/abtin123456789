'use client';

import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-black text-center">محصولات</h1>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Link
          href="/products/men"
          className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <span className="text-6xl mb-4">🧔</span>
          <h2 className="text-xl font-semibold text-black">لباس مردانه</h2>
          <p className="mt-2 text-gray-700 text-center max-w-xs">
            مجموعه‌ای از بهترین لباس‌های مردانه با کیفیت و طراحی مدرن.
          </p>
        </Link>

        <Link
          href="/products/women"
          className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <span className="text-6xl mb-4">👩</span>
          <h2 className="text-xl font-semibold text-black">لباس زنانه</h2>
          <p className="mt-2 text-gray-700 text-center max-w-xs">
            بهترین انتخاب برای لباس‌های زنانه شیک و متنوع.
          </p>
        </Link>

        <Link
          href="/products/kids"
          className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <span className="text-6xl mb-4">🧒</span>
          <h2 className="text-xl font-semibold text-black">لباس بچگانه</h2>
          <p className="mt-2 text-gray-700 text-center max-w-xs">
            لباس‌های نرم و راحت برای کودکان با طرح‌های جذاب.
          </p>
        </Link>
      </section>
    </div>
  );
}
