"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);


  const handleSubmit = async (e) => {
   
    e.preventDefault();

    if (!name || !email || !password) {
      return setMessage("Талбарыг бөглөнө үү");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("Аль хэдийнээ бүртгэгдсэн имэйл байна");
      } else if (res.status === 404) {
        setError("Буруу бүтэцтэй имэйл хаяг байна");
      } else if (res.status === 201) {
        router.push("/login?success=Account has been created");
      } else {
        setError("Серверийн алдаа гарлаа");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div
      className="relative top-0 left-0 w-full h-full flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/register.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full p-6 bg-gray-300 shadow-md">
        <h2 className="text-2xl mb-4">Бүртгүүлэх</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Нэр
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Имэйл
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Нууц үг
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 items-center justify-between">
            <button
              onClick={handleSubmit}
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Бүртгүүлэх
            </button>
            <p className="text-red-600 text-[14px]">{error ? error : message}</p>
            <Link href="/login" className="text-blue-500 hover:underline">
              Бүртгэлтэй юу?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
