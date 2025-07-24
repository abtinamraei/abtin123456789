'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from '../components/footer';
import { useCartStore } from '../store/usecartstore';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const totalItems = useCartStore(state => state.cartItems.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'خانه', href: '/', icon: '🏠' },
    { name: 'فروشگاه', href: '/shop-site', icon: '🛍️' },
    { name: 'محصولات', href: '/products', icon: '👕' },
    { name: 'سبد خرید', href: '/cart', icon: '🛒' },
    { name: 'درباره ما', href: '/about', icon: 'ℹ️' },
  ];

  return (
    <html lang="fa" dir="rtl" className="bg-white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white min-h-screen text-black font-sans flex flex-col">
        <div className="flex flex-col min-h-screen bg-white">
          {/* هدر قرمز با گوشه گرد پایین */}
          <header className="bg-red-600 rounded-b-xl shadow border-b border-red-700 w-full">
            <nav className="max-w-6xl mx-auto px-4 py-3 md:px-6">
              <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-white">فروشگاه لباس</h1>
                
                {/* منوی دسکتاپ */}
                {!isMobile && (
                  <ul className="hidden md:flex space-x-reverse space-x-4 md:space-x-6">
                    {menuItems.map((item) => (
                      <li key={item.name} className="relative">
                        <Link
                          href={item.href}
                          className={`flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors duration-300 ${
                            pathname === item.href
                              ? 'bg-white text-red-600 shadow-md'
                              : 'text-white hover:bg-red-500'
                          }`}
                        >
                          <span className="text-xl relative">
                            {item.icon}
                            {item.name === 'سبد خرید' && totalItems > 0 && (
                              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {totalItems}
                              </span>
                            )}
                          </span>
                          <span className="text-sm md:text-base">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* دکمه منوی همبرگری برای موبایل */}
                {isMobile && (
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white p-2 focus:outline-none"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                )}
              </div>
              
              {/* منوی موبایل */}
              {isMobile && isMenuOpen && (
                <ul className="mt-4 space-y-2 pb-2">
                  {menuItems.map((item) => (
                    <li key={item.name} className="relative">
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors duration-300 ${
                          pathname === item.href
                            ? 'bg-white text-red-600 shadow-md'
                            : 'text-white hover:bg-red-500'
                        }`}
                      >
                        <span className="text-xl relative">
                          {item.icon}
                          {item.name === 'سبد خرید' && totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {totalItems}
                            </span>
                          )}
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </header>

          {/* محتوای اصلی */}
          <main className="flex-grow bg-white max-w-6xl mx-auto p-4 md:p-6 w-full">
            {children}
          </main>

          {/* فوتر */}
          <Footer />
        </div>
      </body>
    </html>
  );
}