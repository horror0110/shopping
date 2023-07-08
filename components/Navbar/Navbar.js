"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faSearch,
  faAmbulance,
  faAnchor,
  faSignIn,
  faSigning,
  faUserPlus,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const session = useSession();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ">
            <div className="flex-shrink-0">
              <Link href="#" className="">
                <Image src="/logo.png" width={60} height={50} alt="logo" />
              </Link>
            </div>
            <div className="hidden md:block ">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/products"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Шинэ
                </Link>

                <Link
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Эрэгтэй
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Эмэгтэй
                </Link>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6 ">
                    <div className="relative  ">
                      <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      <Link href="#">
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ fontSize: 20, color: "white" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                {session.status === "unauthenticated" && (
                  <div>
                    <Link
                      href="/register"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Бүртгүүлэх
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        style={{ fontSize: 15, color: "white", marginLeft: 8 }}
                      />
                    </Link>

                    <Link
                      href="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Нэвтрэх
                      <FontAwesomeIcon
                        icon={faSignIn}
                        style={{ fontSize: 15, color: "white", marginLeft: 8 }}
                      />
                    </Link>
                  </div>
                )}

                {session.status === "authenticated" && (
                  <Link
                    href="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Сагс
                    <FontAwesomeIcon
                      icon={faBasketShopping}
                      style={{ fontSize: 15, color: "white", marginLeft: 8 }}
                    />
                  </Link>
                )}

                {session.status === "authenticated" && (
                   <Link
                   onClick={signOut}
                   href="/"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                 >
                   гарах
                   <FontAwesomeIcon
                     icon={faBasketShopping}
                     style={{ fontSize: 15, color: "white", marginLeft: 8 }}
                   />
                 </Link>
                )}

                {/* Add more menu items here */}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Heroicon name: menu */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Heroicon name: x */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/products"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Шинэ
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Эмэгтэй
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Эрэгтэй
          </Link>

          {session.status === "unauthenticated" && (
            <div>
              <Link
                href="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Нэвтрэх
                <FontAwesomeIcon
                  icon={faSignIn}
                  style={{ fontSize: 15, color: "white", marginLeft: 8 }}
                />
              </Link>

              <Link
                href="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Бүртгүүлэх
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={{ fontSize: 15, color: "white", marginLeft: 8 }}
                />
              </Link>
            </div>
          )}
      {session.status === "authenticated" && (
           <Link
           href="/"
           className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
         >
           Сагс
           <FontAwesomeIcon
             icon={faBasketShopping}
             style={{ fontSize: 15, color: "white", marginLeft: 8 }}
           />
         </Link>

      )}
       

          {session.status === "authenticated" && (
            <Link
            onClick={signOut}

            href="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            гарах
            <FontAwesomeIcon
              icon={faBasketShopping}
              style={{ fontSize: 15, color: "white", marginLeft: 8 }}
            />
          </Link>
          )}

          {/* Add more menu items here */}
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white rounded-md px-3 py-2 w-120 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Link href="#">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: 20, color: "white" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
