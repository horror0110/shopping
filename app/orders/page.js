"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loading from '@/components/Loading/Loading';
import { ThemeContext } from '@/context/ThemeContext';
import Spinner from '@/components/Loading/Loading';
const thousandify = require("thousandify");

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedSizes, setCheckedSizes] = useState({});
  const [message , setMessage] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const { setData , setSpinner } = useContext(ThemeContext);

  useEffect(() => {

    setSpinner(true);
    
    if (!session) {
      router.push('/login');
    } else if (session?.user?.email) {
      fetch(`api/orders/${session.user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSpinner(false);
          setProducts(data);
          calculateTotalPrice(data);
        })
        .catch((error) => {
          setSpinner(false);
          console.error('Error:', error);
        });
    }
  }, [session]);

  const calculateTotalPrice = (products) => {
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    setTotalPrice(totalPrice);
  };

  const handleRemoveProduct = (el) => {
    fetch(`api/orders/${el._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== el._id)
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - el.price);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCheckboxChange = (productId, type, value) => {
    if (type === 'color') {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [productId]: value,
      }));
    } else if (type === 'size') {
      setCheckedSizes((prevCheckedSizes) => ({
        ...prevCheckedSizes,
        [productId]: value,
      }));
    }
  };

  const handleBuyProduct = () => {
    // Check if there are any selected items
    const hasSelectedItems = Object.values(checkedItems).some((color) => color !== '') ||
      Object.values(checkedSizes).some((size) => size !== '');
  
    if (!hasSelectedItems) {
      
      return setMessage("өнгө болон размераа сонгоно уу!")
    }
  
    const selectedItems = products.map((product) => ({
      ...product,
      selectedColor: checkedItems[product._id] || '',
      selectedSize: checkedSizes[product._id] || '',
      niitUne: totalPrice,
    }));
  
    setData(selectedItems);
  
    router.push('/checkout');
  };
  

  if (sessionStatus === 'loading') {
    return <Spinner />;
  }

  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="orders-container">
      {products.map((el) => (
        <div key={el._id} className="order-item border p-4 rounded-md flex">
          <div className="image-container mr-4">
            <Image src={el.photo[0]} width={300} height={300} alt={el.name} />
          </div>
          <div className="details-container">
            <h1 className="product-name text-2xl font-bold mb-2">{el.name}</h1>
            <p className="product-description mb-2">{el.description}</p>
            <p className="product-price mb-2 font-bold ">{thousandify(el.price)}₮</p>
            {el.color.length > 0 && (
              <p className="font-bold mb-2">Бэлэн байгаа өнгө</p>
            )}
            {el.color.map((color) => (
              <label key={color} className="checkbox-label flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(el._id, 'color', color)}
                  checked={checkedItems[el._id] === color}
                  className="mr-2"
                />
                {color}
              </label>
            ))}
            {el.size.length > 0 && (
              <p className="font-bold mb-2">Бэлэн байгаа размер</p>
            )}
            {el.size.map((size) => (
              <label key={size} className="checkbox-label flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(el._id, 'size', size)}
                  checked={checkedSizes[el._id] === size}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
            <div className="buttons-container">
              <button
                onClick={() => handleRemoveProduct(el)}
                className="remove-button bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
              >
                Сагснаас устгах
              </button>
            </div>
          </div>
        </div>
      ))}
      {products.length > 0 && (
        <div className="m-4 text-xl font-bold">
          Нийт үнэ: {thousandify(totalPrice)}₮
        </div>
      )}
      {products.length > 0 && (
        <button
          onClick={handleBuyProduct}
          className="m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Сагсан доторх барааг худалдаж авах
        </button>
      )}
      <div className='m-4 text-red-600 font-bold'>{message}</div>
    </div>
  );
};

export default Orders;
