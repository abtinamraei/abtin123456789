// components/Footer.jsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-4 border-t border-gray-300" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 text-right space-y-2 text-sm">
        <p>ایمیل: abtin.amraei@gmail.com</p>
        <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
        <p>آدرس: بلوار فردوس غرب، شقایق جنوبی، کوچه هجدهم</p>

        <p className="mt-4">
          <Link 
            href="/about" 
            className="text-gray-700 no-underline cursor-pointer"
          >
            درباره ما
          </Link>
        </p>

        <p className="mt-6 font-semibold text-center" dir="ltr">
          کلیه حقوق این سایت محفوظ است © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
