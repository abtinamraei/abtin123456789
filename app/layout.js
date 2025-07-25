'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from '../components/footer';
import SideCart from '../components/SideCart';
import { useCartStore } from '../store/usecartstore';
import { useState, useEffect, useRef } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const totalItems = useCartStore(state => state.cartItems.length);
  const isSideCartOpen = useCartStore(state => state.isSideCartOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isSideCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideCartOpen]);

  // دریافت داده‌ها از API با debounce ساده
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setHighlightedIndex(-1);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetch(`/api/products?category=all`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(product =>
            product.name.includes(searchTerm) || product.description.includes(searchTerm)
          );
          setSearchResults(filtered);
          setHighlightedIndex(filtered.length > 0 ? 0 : -1);
        });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // بستن جعبه جستجو با کلیک خارج
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchTerm('');
        setSearchResults([]);
        setHighlightedIndex(-1);
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // مدیریت کلیدهای کیبورد برای جستجو
  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && searchResults[highlightedIndex]) {
        const id = searchResults[highlightedIndex].id;
        setSearchOpen(false);
        setSearchTerm('');
        setSearchResults([]);
        setHighlightedIndex(-1);
        window.location.href = `/products/${id}`;
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      setSearchTerm('');
      setSearchResults([]);
      setHighlightedIndex(-1);
    }
  }

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
        <div className="flex flex-col min-h-screen bg-white relative">
          <header className="bg-red-600 rounded-b-xl shadow border-b border-red-700 w-full z-20">
            <nav className="max-w-6xl mx-auto px-4 py-3 md:px-6">
              <div className="flex justify-between items-center relative">
                <h1 className="text-xl md:text-2xl font-bold text-white">فروشگاه لباس</h1>

                {/* منوی دسکتاپ */}
                {!isMobile && (
                  <ul className="hidden md:flex space-x-reverse space-x-4 md:space-x-6 items-center">
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

                    {/* آیکون سرچ دسکتاپ */}
                    <li className="relative" ref={searchInputRef}>
                      <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="text-white p-2 rounded-md hover:bg-red-500 transition"
                        aria-label="جستجو"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                          />
                        </svg>
                      </button>

                      {searchOpen && (
                        <div
                          className="absolute left-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg z-50 p-3 max-h-72 overflow-auto text-right
                          md:w-64
                          sm:w-full"
                        >
                          <input
                            type="text"
                            autoFocus
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="جستجوی محصولات..."
                            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                          />

                          {searchResults.length === 0 && searchTerm.trim() !== '' && (
                            <div className="text-gray-600 mt-2">محصولی یافت نشد</div>
                          )}

                          <ul className="mt-2 space-y-2 max-h-56 overflow-auto">
                            {searchResults.map((product, index) => (
                              <li
                                key={product.id}
                                className={`cursor-pointer rounded-md p-2 text-sm ${
                                  index === highlightedIndex ? 'bg-red-100' : 'hover:bg-red-50'
                                }`}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchTerm('');
                                  setSearchResults([]);
                                  setHighlightedIndex(-1);
                                  window.location.href = `/products/${product.id}`;
                                }}
                              >
                                <Link href={`/products/${product.id}`} className="flex items-center gap-2 text-black">
                                  <span className="text-xl">{product.emoji}</span>
                                  <div>
                                    <div className="font-semibold">{product.name}</div>
                                    <div className="text-xs text-gray-600">{product.price.toLocaleString()} تومان</div>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  </ul>
                )}

                {/* موبایل: دکمه سرچ + دکمه همبرگر کنار هم */}
                {isMobile && (
                  <div className="flex items-center gap-2">
                    {/* دکمه سرچ */}
                    <button
                      onClick={() => setSearchOpen(!searchOpen)}
                      className="text-white p-2 rounded-md hover:bg-red-500 transition"
                      aria-label="جستجو"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                        />
                      </svg>
                    </button>

                    {/* دکمه همبرگر */}
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="text-white p-2 focus:outline-none"
                      aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                      </svg>
                    </button>
                  </div>
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

              {/* جعبه جستجو موبایل */}
              {searchOpen && isMobile && (
                <div
                  ref={searchInputRef}
                  className="absolute top-full right-0 mt-2 w-full max-w-md bg-white text-black rounded-md shadow-lg z-50 p-3 max-h-72 overflow-auto text-right"
                  style={{ left: 'auto' }}
                >
                  <input
                    type="text"
                    autoFocus
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="جستجوی محصولات..."
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  />

                  {searchResults.length === 0 && searchTerm.trim() !== '' && (
                    <div className="text-gray-600 mt-2">محصولی یافت نشد</div>
                  )}

                  <ul className="mt-2 space-y-2 max-h-56 overflow-auto">
                    {searchResults.map((product, index) => (
                      <li
                        key={product.id}
                        className={`cursor-pointer rounded-md p-2 text-sm ${
                          index === highlightedIndex ? 'bg-red-100' : 'hover:bg-red-50'
                        }`}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchTerm('');
                          setSearchResults([]);
                          setHighlightedIndex(-1);
                          window.location.href = `/products/${product.id}`;
                        }}
                      >
                        <Link href={`/products/${product.id}`} className="flex items-center gap-2 text-black">
                          <span className="text-xl">{product.emoji}</span>
                          <div>
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-xs text-gray-600">{product.price.toLocaleString()} تومان</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </nav>
          </header>

          {/* محتوای اصلی */}
          <main className="flex-grow bg-white max-w-6xl mx-auto p-4 md:p-6 w-full">{children}</main>

          {/* فوتر */}
          <Footer />

          {/* سایدکارت */}
          <SideCart />
        </div>
      </body>
    </html>
  );
}
