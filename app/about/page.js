import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Бидний тухай</h1>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Манай бараанууд</h2>
          <p className="text-gray-700 mb-4">
            Here at Awesome Company, we offer a wide range of high-quality products to meet your needs. Browse through our selection of products that are designed to make your life easier and more enjoyable.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image src="/korea.jpg" width={300} height={300} alt="Product 1" className="rounded" />
            <Image src="/usa.png" width={300} height={300} alt="Product 2" className="rounded" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Манай хаяг</h2>
          <p className="text-gray-700 mb-4">
           Доорхи хаягаар үйлчлүүлээрэй
          </p>
          <p className="text-gray-700 mb-4">
            Улаанбаатар Хот Шангрилла молл
          </p>
          <div className="mb-4">
            <Image src="/address.jpg" width={500} height={500} alt="Store" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
