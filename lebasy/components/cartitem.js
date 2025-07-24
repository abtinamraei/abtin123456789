'use client';

export default function CartItem({ item }) {
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-gray-50">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
        <div>
          <h3 className="font-bold text-black">{item.name}</h3>
          <p className="text-gray-600">
            قیمت: {item.price.toLocaleString()} × {item.quantity}
          </p>
        </div>
      </div>
      <button className="text-red-500 hover:text-red-700 font-bold">حذف</button>
    </div>
  );
}