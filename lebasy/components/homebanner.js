'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

export default function HomeBanner() {
  const slides = [
    { id: 1, text: '🔥 حراج تابستانی با ۵۰٪ تخفیف!', bg: 'from-yellow-400 to-orange-500' },
    { id: 2, text: '🧥 لباس مردانه جدید رسید!', bg: 'from-blue-500 to-blue-800' },
    { id: 3, text: '🎒 آماده مدرسه با لباس بچگانه', bg: 'from-pink-400 to-red-500' },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      loop
      className="w-full h-64 rounded-xl shadow-md overflow-hidden"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className={`h-full flex items-center justify-center text-white text-xl md:text-3xl font-bold bg-gradient-to-l ${slide.bg}`}>
            {slide.text}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
