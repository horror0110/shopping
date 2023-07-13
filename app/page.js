"use client";
import AddCart from "@/components/AddCart/AddCart";
import Carousel from "@/components/Carousel/Carousel";
import Spinner from "@/components/Loading/Loading";
import Success from "@/components/Success/Success";
export default function Home() {

  return (
    <div>
      <Spinner/>
      <Carousel/>
      <Success/>
      <AddCart/>
  
  

    </div>
  );
}
