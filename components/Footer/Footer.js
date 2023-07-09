import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 sm:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4">Компани</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">Бидний тухай</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Холбоо барих</Link>
              </li>
            </ul>
          </div>
        
  
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 sm:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4">Сошиал</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">Facebook</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Instagram</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Twitter</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Ecommerce. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
