"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Orders = () => {
  const [products, setProducts] = useState([]);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`api/orders/${session.user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [session]);

  const handleRemoveProduct = (productId) => {
    // Implement logic to remove the product from the order
  };

  const handleBuyProduct = (productId) => {
    // Implement logic to buy the product
  };

  return (
    <div>
      {products.map((el) => (
        <div key={el._id} className="mb-4 p-4 border rounded">
          <div className="flex items-center mb-2">
            <Image src={el.photo[0]} width={300} height={300} alt={el.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h1 className="text-xl font-bold">{el.name}</h1>
              <p className="text-gray-500">{el.description}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold mr-4">{el.price}₮</p>
            <button
              onClick={() => handleRemoveProduct(el.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Remove
            </button>
            <button
              onClick={() => handleBuyProduct(el.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
