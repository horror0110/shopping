"use client";
import React, { useState, useEffect } from "react";

const allProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("api/products", {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Nike пүүзнүүд</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-300 rounded p-4 flex flex-col justify-between"
          >
            <div>
              <img
                src={product.photo[0]}
                alt={product.name}
                className="h-40 object-cover mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500 mb-2">Үнэ: {product.price}</p>
              <p className="text-sm text-gray-500 mb-2">
                Бэлэн байгаа: {product.balance}
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Сагсанд хийх
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default allProducts;