"use client";

const thousandify = require("thousandify");

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "@/components/Loading/Loading";
import React, { useState, useEffect } from "react";

const Page = ({ params }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`api/products/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.id]);

  return (
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
            <h2 className="text-xl font-bold mb-2">Үнэ: {thousandify(product.price)}₮</h2>
            <h3 className="text-lg font-bold mb-2">Бэлэн байгаа: {product.balance}</h3>
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Сагсанд хийх
            </button>
          </div>
          
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
