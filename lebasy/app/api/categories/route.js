import { NextResponse } from 'next/server';

const categories = [
  { id: 'men', name: 'مردانه', emoji: '🧔' },
  { id: 'women', name: 'زنانه', emoji: '👩' },
  { id: 'kids', name: 'بچگانه', emoji: '🧒' },
];

export async function GET() {
  return NextResponse.json(categories);
}
