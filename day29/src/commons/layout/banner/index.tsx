"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";

import banner1 from "@/assets/nowadays.png";
import banner2 from "@/assets/banhang.png";
import banner3 from "@/assets/Vhvj.png";

const bannerImages = [banner1, banner2, banner3];

export default function Banner() { 
  return (
    <div className={styles.bannerBody}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className={styles.mySwiper}
      >
        {bannerImages.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`배너 이미지 ${index + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              className={styles.bannerImage}
              priority={index === 0} // 첫 번째 이미지는 우선 로딩
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}