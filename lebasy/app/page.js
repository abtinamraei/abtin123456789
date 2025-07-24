'use client';
 // مسیر درست را چک کن
import HomeBanner from '../components/homebanner';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen p-6 space-y-10 flex flex-col items-center">
      <div className="max-w-6xl w-full flex justify-end mb-10">
        <HomeBanner />
      </div>

      <section className="max-w-6xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-black">دسته‌بندی لباس‌ها:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/products/men" className="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl shadow transition text-center">
            <span className="text-2xl">🧔</span>
            <h3 className="text-lg font-bold mt-2 text-black">لباس مردانه</h3>
          </Link>

          <Link href="/products/women" className="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl shadow transition text-center">
            <span className="text-2xl">👩</span>
            <h3 className="text-lg font-bold mt-2 text-black">لباس زنانه</h3>
          </Link>

          <Link href="/products/kids" className="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl shadow transition text-center">
            <span className="text-2xl">🧒</span>
            <h3 className="text-lg font-bold mt-2 text-black">لباس بچگانه</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
