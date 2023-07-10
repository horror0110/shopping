
"use client";
import React, { useState, useEffect, useRef } from "react";
const thousandify = require("thousandify");
import Link from "next/link";

const Beauty = () => {
  const [products, setProducts] = useState([]);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    fetch("api/categories/64ab9298fdae604aa01fb617/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleNextClick = () => {
    const container = productsContainerRef.current;
    container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
  };
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Гоо сайхны бараа</h1>
        <div className="overflow-x-auto" ref={productsContainerRef}>
          <div className="flex space-x-4">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="border border-gray-300 rounded p-4 flex flex-col justify-between w-64"
              >
                <div>
                  <img
                    src={product.photo[0]}
                    alt={product.name}
                    className="h-40 w-full object-cover mb-4"
                  />
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-500 mb-2 w-[200px]">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Үнэ:
                    <strong className="text-black">
                      {thousandify(product.price)}₮
                    </strong>{" "}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Бэлэн байгаа:{" "}
                    <strong className="text-black">{product.balance}</strong>
                  </p>
                  <div className="flex space-x-2">
                    {product.color.map((color) => (
                      <div
                        key={color}
                        className={`w-6 h-6 rounded-full bg-${color} border border-gray-300`}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex space-x-2">
                    {product.size.map((size) => (
                      <div
                        key={size}
                        className="border border-gray-300 rounded p-1"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col ">
                    <Link
                      href="/"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
                    >
                      Сагсанд хийх
                    </Link>

                    <Link
                      href={product._id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
                    >
                      Дэлгэрэнгүй
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Beauty;
