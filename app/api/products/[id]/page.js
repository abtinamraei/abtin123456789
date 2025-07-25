// app/products/[id]/page.js

const products = [
    { id: 1, name: 'پیراهن مردانه', category: 'men', price: 1500000, emoji: '👔', description: 'پیراهن مردانه راحت و شیک' },
    { id: 2, name: 'پیراهن زنانه', category: 'women', price: 160000, emoji: '👗', description: 'پیراهن زنانه زیبا' },
    { id: 3, name: 'لباس بچگانه', category: 'kids', price: 90000, emoji: '🧒', description: 'لباس نرم و راحت برای کودکان' },
    { id: 4, name: 'تی‌شرت سفید', category: 'men', price: 120000, emoji: '👕', description: 'تی‌شرت خنک مردانه' },
    { id: 5, name: 'دامن بلند', category: 'women', price: 220000, emoji: '👚', description: 'دامن زیبا و بلند زنانه' },
    { id: 6, name: 'کفش ورزشی بچگانه', category: 'kids', price: 130000, emoji: '👟', description: 'کفش راحت برای کودکان' },
  ];
  
  export default function ProductPage({ params }) {
    const id = parseInt(params.id, 10);
    const product = products.find(p => p.id === id);
  
    if (!product) {
      return <div className="p-6 text-center text-red-600">محصول یافت نشد</div>;
    }
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{product.emoji} {product.name}</h1>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg font-semibold text-red-600">{product.price.toLocaleString()} تومان</p>
      </div>
    );
  }
  