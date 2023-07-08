"use client";
import Carousel from "@/components/Carousel/Carousel";
import Loading from "@/components/Loading/Loading";
import Image from "next/image";
export default function Home() {

  const photos = [
    '/first.jpg',
    '/second.jpg',
    '/third.jpg',
  ];
  return (
    <div>
      
      <Carousel photos={photos} />
    </div>
  );
}
