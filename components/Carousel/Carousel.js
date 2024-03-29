import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Beauty from "../Beauty/Beauty";
import Man from "../Man/Man";
import Woman from "../Woman/Woman";
import Shoes from "../Shoes/Shoes";
import Bag from "../Bag/Bag";
import Travel from "@/app/travel/page";
import Homeproduct from "../Home/Home";

const Carousel = () => {
 

  const sliderItems = [
    {
      id: 1,
      text: "Зуны шинэ загварууд худалдаанд гарлаа",
      imageUrl: "first.jpg",
    },
    {
      id: 2,
      text: "Хайсан бүхнээ нэг дороос",
      imageUrl: "second.jpg",
    },
    {
      id: 3,
      text: "Шинэлэг загварууд",
      imageUrl: "third.jpg",
    },
    // Add more slider items as needed
  ];

  return (
    <div className="w-full">
      <Swiper spaceBetween={30} slidesPerView={1} navigation loop autoplay>
        {sliderItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-8 relative"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <h1 className="text-6xl text-white font-bold z-10">
                {item.text}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Man/>
      <Woman/>
      <Beauty/>
      <Shoes/>
      <Bag/>
      <Travel/>
      <Homeproduct/>

      



    </div>
  );
};

export default Carousel;
