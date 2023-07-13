import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext } from 'react';
import Shadow from '../Shadow/Shadow';

const Success = () => {

    const {openSuccess , closeSuccess} = useContext(ThemeContext);

  return (
    <div>
        <Shadow/>
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        openSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    > 
    
      <div className="bg-white rounded-lg p-8 max-w-sm mx-auto shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Захиалга амжилттай хийгдлээ!</h2>
        <p className="text-gray-600 mb-4">
          Захиалга амжилттай хийгдлээ. Бид тантай холбогдон түргэн шуурхай хүргэлтийг хийх болно .
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={closeSuccess}
        >
          Хаах
        </button>
      </div>
    </div>


    </div>
    
  );
};

export default Success;