import Link from 'next/link';
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Бидэнтэй холбогдох</h1>
        <div className="mb-4">
          <p className="text-gray-700">
            For any inquiries, please feel free to reach out to us via the following methods:
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Facebook:</strong> <Link href="https://www.facebook.com/tozzy.baagii" target="_blank" rel="noopener noreferrer">Бидний хуудас</Link>
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong>+976 99279933
          </p>
        </div>
        <form>
          {/* Your form fields go here */}
        </form>
      </div>
    </div>
  );
};

export default Contact;
