import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 sm:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">About</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Careers</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 sm:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">Categories</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">New Arrivals</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Sale</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 sm:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">Shipping</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">Returns</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 sm:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4">Stay Connected</h3>
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
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
