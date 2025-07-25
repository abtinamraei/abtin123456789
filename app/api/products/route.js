import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'پیراهن مردانه', category: 'men', price: 1500000, emoji: '👔', description: 'پیراهن مردانه راحت و شیک' },
  { id: 2, name: 'پیراهن زنانه', category: 'women', price: 160000, emoji: '👗', description: 'پیراهن زنانه زیبا' },
  { id: 3, name: 'لباس بچگانه', category: 'kids', price: 90000, emoji: '🧒', description: 'لباس نرم و راحت برای کودکان' },
  { id: 4, name: 'تی‌شرت سفید', category: 'men', price: 120000, emoji: '👕', description: 'تی‌شرت خنک مردانه' },
  { id: 5, name: 'دامن بلند', category: 'women', price: 220000, emoji: '👚', description: 'دامن زیبا و بلند زنانه' },
  { id: 6, name: 'کفش ورزشی بچگانه', category: 'kids', price: 130000, emoji: '👟', description: 'کفش راحت برای کودکان' },
];

export async function GET(request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const sort = url.searchParams.get('sort');

  let filteredProducts = products;

  if (category && category !== 'all') {
    filteredProducts = products.filter(p => p.category === category);
  }

  if (sort) {
    if (sort === 'price-asc') {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }
  }

  return NextResponse.json(filteredProducts);
}
