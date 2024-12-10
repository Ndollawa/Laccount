import React, { useEffect } from "react";
import {Swiper, SwiperSlide} from "swiper/react"; 
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css"; 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const BrandPartners = () => {
  const images = Array(10).fill("assets/images/resources/brand-1-1.png");

  const swiperConfig = {
    // modules:{[Navigation, Pagination, Scrollbar, A11y]},
    spaceBetween: 30,
    slidesPerView: 5,
    autoplay: { delay: 500 },
    breakpoints: {
      0: { spaceBetween: 30, slidesPerView: 2 },
      375: { spaceBetween: 30, slidesPerView: 2 },
      575: { spaceBetween: 30, slidesPerView: 3 },
      767: { spaceBetween: 50, slidesPerView: 4 },
      991: { spaceBetween: 30, slidesPerView: 5 },
      1199: { spaceBetween: 30, slidesPerView: 5 },
    }, 
  };


  return (
    <section>
        <Swiper
          className="swiper-container"
            {...swiperConfig}
          >
          {images.map((src, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <img src={src} alt={`Brand ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
  );
};

export default BrandPartners;
