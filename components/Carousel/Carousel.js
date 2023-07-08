import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Carousel = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const goToPrevious = () => {
    setCurrentPhoto((prevPhoto) =>
      prevPhoto === 0 ? photos.length - 1 : prevPhoto - 1
    );
  };

  const goToNext = () => {
    setCurrentPhoto((prevPhoto) =>
      prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1
    );
  };

  useEffect(() => {
    // Auto-scroll to the next photo every 3 seconds
    const interval = setInterval(goToNext, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="relative overflow-hidden">
      <img
        src={photos[currentPhoto]}
        alt={`Photo ${currentPhoto + 1}`}
        className="w-screen h-screen md:h-auto"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="absolute top-[150px] left-0 right-0 p-8 text-center text-white">
        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
          Зун, Хавар, Намрын Шинэ загварууд худалдаанд гарлаа
        </h1>
        <Link className="text-white bg-blue-500 px-4 py-2 rounded-lg mt-[2rem] inline-block mt-12" href="/buy">
          Худалдан авалт хийх
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
