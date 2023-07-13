"use client";

const thousandify = require("thousandify");

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "@/components/Loading/Loading";
import React, { useState, useEffect , useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import Addcart from "@/components/AddCart/AddCart";
import Spinner from "@/components/Loading/Loading";

const Page = ({ params }) => {
  const [product, setProduct] = useState(null);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const {handleAddToCart , setSpinner} = useContext(ThemeContext);

  useEffect(() => {
    setSpinner(true);
    fetch(`api/products/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSpinner(false);
        setProduct(data);
      })
      .catch((error) => {
        setSpinner(false);
        console.error("Error:", error);
      });
  }, [params.id]);

  const moveOrder = (el) => {
    setSpinner(true);
   

    if (sessionStatus === 'unauthenticated') {
      router.push('/login');
    } else if (sessionStatus === 'authenticated') {
      const orderData = {
        email: session.user.email,
        name: el.name,
        description: el.description,
        photo: el.photo, // Use el.photo instead of data.photo
        category: el.category,
        price: el.price,
        balance: el.balance,
        color: el.color,
        size: el.size,
      };
      fetch('api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (response.ok) {
            setSpinner(false);
             handleAddToCart();
          } else {
            throw new Error('Failed to add order');
          }
        })
        .catch((error) => {
          console.log(error);
          setSpinner(false);
        });
    }
  };

  return (
    <div>
      <Spinner/>
 <Addcart/>
    <div className="container mx-auto p-4">
      {product ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <div className="mt-4">
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              className="my-4"
            >
              {product.photo.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt={`Product Photo ${index + 1}`}
                    className="w-[300px] h-[550px] object-cover mr-4"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">
              Үнэ: {thousandify(product.price)}₮
            </h2>
            <h3 className="text-lg font-bold mb-2">
              Бэлэн байгаа: {product.balance}
            </h3>
            <div className="flex space-x-4">
              {product.color.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color, border: "2px solid black" }}
                />
              ))}
            </div>
            <div className="flex space-x-4">
              {product.size.map((size, index) => (
                <div
                  key={index}
                  className="px-2 py-1 border border-gray-400 rounded"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={()=>moveOrder(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
            >
              Сагсанд хийх
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>

    </div>
   
  );
};

export default Page;
