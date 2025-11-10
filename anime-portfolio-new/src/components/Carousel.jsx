import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Carousel component used on the home page to showcase featured
 * products or promotions.  It leverages SwiperJS for smooth
 * transitions, autoplay and navigation controls.  If you need more
 * complex effects (3D cubes or parallax), consult the Swiper
 * documentation.
 */
const Carousel = () => {
  // Array of slides.  Each slide contains an image URL and a caption.

const slides = [
  {
    image: 'https://animeape.com/wp-content/uploads/2025/08/Survey-Corps-Attack-on-Titan_Varsity-Jacket-3L_BACK-Mockup-400x400.jpg',
    title: 'Attack on Titan',
    subtitle: 'Dive into a cyberpunk world of anime fashion',
  },
  {
    image: 'https://shoppingnest.in/cdn/shop/files/9_3b62cd83-6a9c-4c01-986a-d546fc0fa575.jpg',
    title: 'Samurai Spirit',
    subtitle: 'Channel your inner warrior with our katanas and hoodies',
  },
  {
    image: 'https://prestige-life.com/wp-content/uploads/2022/09/One-piece-Hoodie-Jacket-06.jpg',
    title: 'Manga Magic',
    subtitle: 'Explore limited edition prints and figurines',
  },
];


  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className="rounded-lg overflow-hidden shadow-lg"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-64 sm:h-80 md:h-96">
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6">
              <h2 className="text-2xl md:text-4xl font-heading text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg text-gray-200 max-w-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
