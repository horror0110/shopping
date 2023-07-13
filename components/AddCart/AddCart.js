import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext } from 'react';
import Shadow from '../Shadow/Shadow';
import Link from 'next/link';

const Addcart = () => {

    const {addCart , closeAddcard} = useContext(ThemeContext);

  return (
    <div>
        <Shadow/>
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        addCart ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    > 
    
      <div className="bg-white rounded-lg p-8 max-w-sm mx-auto shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Сагсанд хийлээ!</h2>
        
        <Link href="/orders" className="text-gray-600 mb-4">
          Сагсруу очих
        </Link>
        <br/>
        <br/>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={closeAddcard}
        >
          Хаах
        </button>
      </div>
    </div>


    </div>
    
  );
};

export default Addcart;