"use client";
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import Spinner from '@/components/Loading/Loading';

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const params = useSearchParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError(params.get('error'));
    setSuccess(params.get('success'));
  }, [params]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      router?.push('/');
      console.log(session.data.user.email);
    }
  }, [session, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(<p className="mt-4 text-red-700 text-[14px]">Имэйл болон нууц үгээ оруулна уу</p>);
      return;
    }

    signIn('credentials', {
      email,
      password,
    });
  };

  if (session.status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <div className="bg-[url('/loginImg.jpg')] bg-cover bg-center absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}></div>
      <div className="bg-black bg-opacity-50 flex flex-col justify-center items-center h-screen">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <h2 className="text-center text-2xl font-semibold mb-6">Нэвтрэх</h2>
          <h1 className="text-green-600 text-center bold">{success ? success : 'Тавтай морил'}</h1>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Имэйл
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Нууц үг
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
              >
                Нэвтрэх
              </button>

              <Link href="/register" className="text-center text-indigo-500 hover:text-indigo-700">
                Бүртгүүлэх
              </Link>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
              >
                Нууц үг мартсан
              </button>
            </div>
          </form>
          {error === 'User not found' ? (
            <p className="mt-4 text-red-700 text-[14px]">Бүртгэл олдсонгүй</p>
          ) : error === 'Email or password is incorrect' ? (
            <p className="mt-4 text-red-700 text-[14px]">Имэйл эсвэл нууц үг буруу байна</p>
          ) : (
            error
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
