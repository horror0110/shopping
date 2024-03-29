"use client";
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Loading/Loading';

const Checkout = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { data: selectedItems, openSuccessModal, setSpinner } = useContext(ThemeContext);
  const router = useRouter();
  console.log(selectedItems);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const deleteBasket = () => {
    setSpinner(true);
    fetch(`api/checkout/${session.user.email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setSpinner(false);
        } else {
          throw new Error('Failed to place order');
        }
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
    router.push('/');
  };

  const handlePlaceOrder = (e) => {
    setSpinner(true);
    e.preventDefault();

    if (!name || !phone || !address) {
      setMessage('Талбаруудыг бөглөнө үү!!');
      setSpinner(false);
      return;
    }
    if (phone.length < 8) {
      setMessage('Утасны дугаараа зөв оруулна уу');
      setSpinner(false);
      return;
    }

    const totalPrice = selectedItems.length > 0 ? selectedItems[0].niitUne : 0;
    const orderData = {
      name: name,
      productName: selectedItems.map((item) => item.name).join(', '),
      phone: phone,
      address: address,
      color: selectedItems.map((item) => item.selectedColor).join(', '),
      size: selectedItems.map((item) => item.selectedSize).join(', '),
      totalPrice: totalPrice,
    };

    fetch('api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          setSpinner(false);
          deleteBasket();
          openSuccessModal();
        } else {
          throw new Error('Failed to place order');
        }
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  return (
    <div>
      <Spinner />
      <div className="checkout-container">
        <h1 className="text-3xl font-bold mb-6">Захиалга</h1>
        {selectedItems && selectedItems.length > 0 && (
          <h1 className="text-2xl font-bold mb-6"> Захиалгын дүн: {selectedItems[0].niitUne}₮</h1>
        )}

        <div className="selected-items-container">
          {selectedItems.map((item) => (
            <div key={item._id} className="selected-item flex items-center mb-4">
              <div className="image-container mr-4">
                <img src={item.photo[0]} alt={item.name} className="w-16 h-16" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                {item.selectedColor && <p className="text-gray-500">Өнгө: {item.selectedColor}</p>}
                {item.selectedSize && <p className="text-gray-500">Размер: {item.selectedSize}</p>}
              </div>
            </div>
          ))}
        </div>
        <form className="responsive-form">
          <label htmlFor="name">Нэр:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />

          <label htmlFor="phone">Утас:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
            required
          />

          <label htmlFor="address">Хаяг:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input"
            required
          ></textarea>

          <p className="text-red-600 bold">{message}</p>

          <button
            onClick={handlePlaceOrder}
            className="buy-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
          >
            Захиалга хийх
          </button>
        </form>
      </div>

      <style jsx>{`
        .checkout-container {
          padding: 20px;
        }
        .selected-items-container {
          margin-bottom: 20px;
        }
        .selected-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .image-container {
          margin-right: 10px;
        }
        .form-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .responsive-form label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .buy-button {
          display: block;
          width: 100%;
        }

        @media (min-width: 640px) {
          /* Desktop Styles */
          .checkout-container {
            max-width: 640px;
            margin: 0 auto;
          }
          .selected-item {
            margin-bottom: 20px;
          }
          .form-input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .responsive-form {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .buy-button {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
