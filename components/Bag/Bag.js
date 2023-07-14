import React, { useState, useEffect, useRef , useContext } from 'react';
import thousandify from 'thousandify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';


const Bag = () => {
  const [products, setProducts] = useState([]);
  const productsContainerRef = useRef(null);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const {handleAddToCart} = useContext(ThemeContext);

  useEffect(() => {
    fetch('api/categories/64b1210f3db2ba8ee3e19674/products', {
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
  }, []);

  const handleNextClick = () => {
    const container = productsContainerRef.current;
    container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
  };

  const moveOrder = (el) => {
   

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
            handleAddToCart();
          } else {
            throw new Error('Failed to add order');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Цүнх , Чемодан</h1>
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
                    className="h-40 object-cover mb-4"
                  />
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Үнэ: <strong className="text-black">{thousandify(product.price)}₮</strong>
                  </p>
                  <p className="text-sm text-gray-500 mb-2 ">
                    Бэлэн байгаа: <strong className="text-black">{product.balance}</strong>
                  </p>
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => moveOrder(product)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
                  >
                    Сагсанд хийх
                  </button>
                  <a
                    href={product._id}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4 w-[150px]"
                  >
                    Дэлгэрэнгүй
                  </a>
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

export default Bag;
